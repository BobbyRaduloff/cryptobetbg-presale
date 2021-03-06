import { Box } from "../components/Boxes";
import { Footer } from "../components/Footer";
import { Hamburger } from "../components/Hamburger";
import { HR } from "../components/HR";
import useUser from "../lib/useUser";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const Title = ({ children }) => (
  <div className="text-center font-akira text-4xl flex flex-col justify-center iters-center text-vwhite min-w-full mt-4">
    {children}
    <HR />
  </div>
);

export default function ChangePassword({}) {
  useUser({ redirectIfNotFound: "/login" });
  const router = useRouter();
  const [recaptchaCode, setRecaptchaCode] = React.useState(undefined);

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = React.useCallback(async () => {
    if (!executeRecaptcha) {
      return;
    }
    const c = await executeRecaptcha("login");
    setRecaptchaCode(c);
  }, [executeRecaptcha]);

  React.useEffect(() => {
    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const RegisterForm = () => {
    const [status, setStatus] = React.useState(200);
    const [error, setError] = React.useState("");
    const [oldPasswordShown, setOldPasswordShown] = React.useState(false);
    const [newPasswordShown, setNewPasswordShown] = React.useState(false);

    const handleSubmit = async (event) => {
      event.preventDefault();

      if (!recaptchaCode) {
        setStatus(400);
        setError("Our system seems to think you're a robot! Try again later!");
        return;
      }

      const data = {
        newPassword: event.target.newPassword.value,
        oldPassword: event.target.oldPassword.value,
        recaptcha: recaptchaCode,
      };

      const JSONdata = JSON.stringify(data);
      const endpoint = "/api/changepassword";

      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      if (response.status === 200) {
        setStatus(200);
        router.push("/profile");
      } else {
        const result = await response.json();
        setStatus(400);
        setError(result.error);
      }
    };

    return (
      <Box className="flex flex-row justify-center my-2">
        <form
          method="post"
          className="flex flex-col min-w-[84vw] px-[4vw]"
          onSubmit={handleSubmit}
        >
          <label htmlFor="oldPassword" className="text-vwhite text-sans mt-2">
            Old Password:
          </label>
          <div className="relative flex mb-2">
            <input
              required
              type={oldPasswordShown ? "text" : "password"}
              id="oldPassword"
              name="oldPassword"
              className="rounded box-glow-vpurple bg-vbetgray text-vwhite p-2 mt-2 min-w-full"
            />
            <FontAwesomeIcon
              icon={oldPasswordShown ? faEyeSlash : faEye}
              color="#F5F0F6"
              className="absolute top-[40%] right-[5%]"
              onClick={() => setOldPasswordShown(!oldPasswordShown)}
            />
          </div>
          <label htmlFor="newPassword" className="text-vwhite text-sans mt-2">
            New Password:
          </label>
          <div className="relative flex mb-2">
            <input
              required
              type={newPasswordShown ? "text" : "password"}
              id="newPassword"
              name="newPassword"
              className="rounded box-glow-vpurple bg-vbetgray text-vwhite p-2 mt-2 min-w-full"
            />
            <FontAwesomeIcon
              icon={newPasswordShown ? faEyeSlash : faEye}
              color="#F5F0F6"
              className="absolute top-[40%] right-[5%]"
              onClick={() => setNewPasswordShown(!newPasswordShown)}
            />
          </div>
          {status !== 200 ? (
            <div className="flex flex-row justify-center min-w-full p-1 mt-2 bg-red-400 rounded">
              <p className="min-w-full p-1 text-vwhite">{error}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-row min-w-full justify-center mt-4 mb-2">
            <Button
              text="CHANGE"
              className="min-w-[6rem] max-w-[10rem] text-lg p-[0.5rem] px-2"
            />
          </div>
        </form>
      </Box>
    );
  };

  return (
    <div className="flex flex-col justify-start min-h-screen align-top">
      <Hamburger />
      <div className="flex flex-col justify-center mt-[4rem] px-4 ">
        <Title>Change Password</Title>
      </div>
      <RegisterForm />
      <Footer className="absolute bottom-0" />
    </div>
  );
}
