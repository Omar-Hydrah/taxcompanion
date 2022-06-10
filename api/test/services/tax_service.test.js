const taxService = require("../../src/services/tax_service");
const data = require("../../src/data/tax_data.json");

describe("Test tax return", () => {
  const getTaxData = jest.fn();

  getTaxData.mockResolvedValue(data);
  test("Should correctly return tax percentage", async () => {
    const taxGermany = data["germany"][3]["tax"];
    const taxItaly = data["italy"][1]["tax"];
    const taxFrance = data["france"][3]["tax"];
    const taxAll = "21%";
    const resultGermany = await taxService.getTaxPercentage(
      {
        country: "germany",
        salary: 270000,
      },
      { getTaxData }
    );
    const resultItaly = await taxService.getTaxPercentage(
      {
        country: "italy",
        salary: 16000,
      },
      { getTaxData }
    );
    const resultFrance = await taxService.getTaxPercentage(
      {
        country: "france",
        salary: 80881,
      },
      { getTaxData }
    );
    const resultAll = await taxService.getTaxPercentage(
      {
        country: "netherlands",
        salary: 19831,
      },
      { getTaxData }
    );

    expect(resultGermany).toBe(taxGermany);
    expect(resultItaly).toBe(taxItaly);
    expect(resultFrance).toBe(taxFrance);
    expect(resultAll).toBe(taxAll);
  });

  test("Should return minimum value when no salary is sent", async () => {
    const taxFinland = data["finland"][0]["tax"];
    const resultFinland = await taxService.getTaxPercentage(
      { country: "finland" },
      { getTaxData }
    );
    expect(resultFinland).toBe(taxFinland);
  });
});
