async function hi() {
  console.log("Hi");
  let variable = 5;
  console.log("5");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
