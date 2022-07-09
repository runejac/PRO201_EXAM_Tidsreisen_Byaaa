import React from "react";

export function Loading() {
  return (
    <div className="d-flex position-absolute w-100 vh-100 justify-content-center">
      <div className="spinner-border align-self-center" role="status" />
    </div>
  );
}
