export const AboutPage = () => {
  return (
    <div>
      <div className="aboutContainer">
      <h3>About</h3>
        <img
          src="yo.jpg"
          alt="author"
          style={{ width: 180, height: 180, borderRadius: 100 }}
        />
        <span style={{ fontSize: 18, fontWeight: "bold" }}>
          Allan Villatoro
        </span>
        <span>NestJS and React - Challenge 2022</span>
      </div>
    </div>
  );
};
