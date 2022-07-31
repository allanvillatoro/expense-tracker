export const AboutPage = () => {
  return (
    <div>
      <div className="aboutContainer">
      <h3>About</h3>
        <img
          src="background.png"
          alt="background"
          style={{ width: 180, height: 180, borderRadius: 100 }}
        />
        <span style={{ fontSize: 18, fontWeight: "bold" }}>
          Expense Tracker
        </span>
        <span>NestJS and React - Challenge 2022</span>
        <span>Developed by Allan Villatoro</span>
      </div>
    </div>
  );
};
