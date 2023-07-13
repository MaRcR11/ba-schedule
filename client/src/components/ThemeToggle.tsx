function ThemeToggle() {
  return (
    <div className="field">
      <input
        id="switchRoundedDefault"
        type="checkbox"
        name="switchRoundedDefault"
        className="is-rounded switch"
      ></input>
      <label htmlFor="switchRoundedDefault"></label>
    </div>
  );
}

export default ThemeToggle;
