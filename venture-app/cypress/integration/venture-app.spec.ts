describe("Test home page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Landing page", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test Login", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Login function", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test Registeration", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Registeration function", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test Guest Raise Funding", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Guest should not be able to raise project", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test Guest Invest", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Guest should not be able to invest in project", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test Guest Portfolio", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Guest should not be able to access portfolio page", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test User Raise Funding", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("User should be able to post new projects", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test User Invest", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("User should be able to invest in projects", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test User Portfolio", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("User should be able to see updates on their portfolio page", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test User Edit Project", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("User should be able to edit thier porject description", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Test User Delete Project", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("User should be able to delete their projects", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Landing page route check", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Login page route check", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Navigation Bar", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Navigation bar should show appropriate authorization", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Potfolio Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Portfolio page should show user's portfolio", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Register Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Registeration page should be allowed only if not logged in", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Login page should be allowed only if not logged in", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Raise Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Raise project page should only be accessible with user", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});

describe("Invest Page", () => {
  beforeEach(() => {
    cy.visit("https://letsventure.ml");
  });

  it("Invest page should allow investment only to users with account", () => {
    cy.get("h2").contains("Invest in world-changing startups");
  });
});