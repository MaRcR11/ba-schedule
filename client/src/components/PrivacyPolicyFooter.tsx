function PrivacyPolicyFooter() {
  return (
    <footer style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ right: 0, marginBottom: "0.8em", marginTop: "0.8em" }}>
        <p style={{ fontSize: "0.65rem" }}>
          <a
            className="has-text-link"
            onClick={() => {
              window.open("https://ba-schedule.de/privacy-policy", "_blank")?.focus();
            }}
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </footer>
  );
}

export default PrivacyPolicyFooter;
