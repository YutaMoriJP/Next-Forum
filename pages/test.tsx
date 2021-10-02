import React, { useState } from "react";
import Input from "../components/Form/Input";
import useInput from "../useHooks/useInput";
import CryptoJS from "crypto-js";
import { useAuth } from "../store/AuthContext";

const encrypt = (text: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

const decrypt = (data: string) => {
  return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

const Authenicate = () => {
  const { user } = useAuth();

  const { id } = user || { id: null };

  const { title, content, postedID } = {
    title: "TITLE",
    content: "CONTENT",
    postedID: encrypt(id),
  };

  return (
    <>
      {JSON.stringify(decrypt(postedID) === id)}
      {/* authReady is not needed as Layout component already authenticates user */}

      {/* if user is null, then user is not logged in */}
      {/* postedID gets encrypted SERVER side*/}
      {/* decrypt id client side, and check if decrypted id matches user id*/}
      {/* if so, user is allowed to send PUT/DELETE request */}
      {user && decrypt(postedID) === id ? <button>UPDATE</button> : null}

      <h1>{title}</h1>
      <p>{content}</p>
    </>
  );
};

const Test = () => {
  const [encrypted, setEncrypted] = useState("");
  const [decrypted, setDeencrypted] = useState("");

  const [encrypText] = useInput("");

  const handleEncrypt = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { value } = encrypText;
    const encryptedID = encrypt(value);
    setEncrypted(encryptedID);
  };

  const handleDecrypt = () => {
    setDeencrypted(decrypt(encrypted));
  };

  console.log("en", CryptoJS.AES.encrypt(encrypText.value, "PASSWORD"));

  return (
    <div>
      <Authenicate />
      <hr />
      <h1>id 4bebc7aa-e996-47f4-9f38-e04199c34f8b</h1>
      <form onSubmit={handleEncrypt}>
        <Input
          placeholder="ENCRYPT TEXT"
          id="encrypt"
          name="Encrypt"
          label={false}
          onSubmitted={false}
          {...encrypText}
        />
        <button type="submit">ENCRYPT</button>
      </form>
      <p>encrypted {JSON.stringify(encrypted)}</p>

      <hr />

      <button type="submit" onClick={handleDecrypt}>
        DECRYPT
      </button>

      <p>descrypted {JSON.stringify(decrypted)}</p>
    </div>
  );
};

export default Test;
