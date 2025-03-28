const yargs = require("yargs");
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

yargs
  .command({
    command: "guardar",
    describe: "Guardar productos en un archivo JSON",
    builder: {
      filePath: {
        describe: "Ruta del archivo JSON",
        demandOption: true,
        type: "string"
      }
    },
    handler: (argv) => {
      rl.question("Ingrese el producto: ", (name) => {
        rl.question("Ingrese su precio: ", (price) => {
          rl.question("Ingrese su calidad: ", (quality) => {
            const filePath = argv.filePath;

            if (!fs.existsSync(filePath)) {
              fs.writeFileSync(filePath, "[]", "utf8");
            }

            let listaproductos;
            try {
              const data = fs.readFileSync(filePath, "utf8");
              listaproductos = JSON.parse(data);
            } catch (error) {
              console.error("Error al leer el archivo JSON:", error.message);
              listaproductos = [];
            }

            const producto = {
              nombre: name,
              precio: price,
              calidad: quality,
            };

            listaproductos.push(producto);

            try {
              fs.writeFileSync(
                filePath,
                JSON.stringify(listaproductos, null, 2),
                "utf-8"
              );
              console.log("Producto guardado correctamente.");
            } catch (error) {
              console.error(
                "Error al escribir en el archivo JSON:",
                error.message
              );
            }

            console.log(
              "Contenido del archivo JSON:",
              fs.readFileSync(filePath, "utf-8")
            );

            rl.close();
          });
        });
      });
    }
  })
  .help()
  .argv;