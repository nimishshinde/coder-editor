import React from "react";

function Logo({ customeClass, style }) {
  return (
    <img
      src="/buddy-high-resolution-logo-transparent.png"
      alt="code-sync-logo"
      className={customeClass ? customeClass : ""}
      style={style !== "" ? style : {}}
    />
  );
}

export default Logo;
