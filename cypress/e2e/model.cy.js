import { createTestMachine, createTestModel } from "@xstate/test";

let machine = createTestMachine({
  id: "feedback",
  initial: "question",
  states: {
    question: {
      on: {
        CLICK_GOOD: "thanks",
        CLICK_BAD: "form",
        CLOSE: "closed",
        // ESC: "closed",
      },
    },
    form: {
      on: {
        SUBMIT: "thanks",
        CLOSE: "closed",
        // ESC: "closed",
      },
    },
    thanks: {
      on: {
        CLOSE: "closed",
        // ESC: "closed",
      },
    },
    closed: {
      type: "final",
    },
  },
});

let model = createTestModel(machine);

describe("Model based test", () => {
  model.getSimplePaths().forEach((path) => {
    it(path.description, () => {
      cy.visit("/");

      path.testSync({
        states: {
          question: () => {
            cy.findByText(/¿Cómo te lo estás pasando?/i).should("be.visible");
          },
          form: () => {
            cy.findByText(
              /¿Nos podrías indicar en qué podemos mejorar?/i
            ).should("be.visible");
          },
          thanks: () => {
            cy.findByText(/¡Gracias por tu aporte!/i).should("be.visible");
          },
          closed: () => {
            cy.findByText(/Chau!/i).should("be.visible");
          },
        },
        events: {
          CLICK_GOOD: () => {
            cy.findByRole("button", { name: /increíble/i }).click();
          },
          CLICK_BAD: () => {
            cy.findByRole("button", { name: /No tan bien.../i }).click();
          },
          CLOSE: () => {
            cy.findByTestId("x-close-btn").click();
          },
          SUBMIT: () => {
            cy.findByPlaceholderText(/Escribe aquí/i).type(
              "Nada, solo un test. Sois lo mas!"
            );
            cy.findByRole("button", { name: /Enviar/i }).click();
          },
          // ESC: () => {
          //   cy.get("body").type("{esc}");
          //   cy.get("body").type("{esc}");
          // },
        },
      });
    });
  });
});
