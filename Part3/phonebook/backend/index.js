const express = require("express");
const morgan = require("morgan");

const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-43-234345",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(
  morgan(function (tokens, request, response) {
    return [
      tokens.method(request, response),
      tokens.url(request, response),
      tokens.status(request, response),
      tokens.res(request, response, "content-length"),
      "-",
      tokens["response-time"](request, response),
      "ms",
      JSON.stringify(request.body), // Adiciona o corpo da requisição JSON
    ].join(" ");
  })
);

const unknownEndPoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).send("NOT FOUND");
  }
});

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/persons/", (request, response) => {
  const body = request.body;

  const nameExist = persons.some((person) => person.name === body.name);

  if (nameExist) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  if (!body.name && !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const getDataAndHourCurrent = () => {
  const dateAndHours = new Date();

  const dateFormated = dateAndHours.toDateString();
  const hoursFormated = dateAndHours.toTimeString().split(" ")[0];
  const timeZone = dateAndHours.toTimeString().split(" ")[1];

  return `${dateFormated} ${hoursFormated} ${timeZone} (${
    Intl.DateTimeFormat().resolvedOptions().timeZone
  })`;
};

app.get("/info", (request, response) => {
  const numberEntriesPhonebook = persons.length;
  const localDateFormat = getDataAndHourCurrent();

  response.send(`
      <h1>Phonebook has info for ${numberEntriesPhonebook} people</h1>
      <p>${localDateFormat}</p>`);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
