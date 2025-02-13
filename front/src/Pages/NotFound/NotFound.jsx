export default function NotFound(){
    return(
        <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "40%",
          height: "60%",
          background:
            "linear-gradient(to left,rgb(2, 52, 48,0.3) 20%,rgb(2, 52, 48))",
        }}
      >
        <h1>404 Not Found!</h1>
      </section>
    </main>
    )
}