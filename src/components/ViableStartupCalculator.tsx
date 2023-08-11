import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Nav from "./Nav";

interface Option {
  value: number;
  label: string;
}

interface Resource {
  label: string;
  url: string;
}

interface InputProps {
  label: string;
  task: string;
  question: string;
  guidance: string;
  resources: Resource[];
  options: Option[];
  selectedOption: string;
  onResultChange: (result: number) => void;
  onOptionChange: (option: string) => void;
}

const InputWithDropdown: React.FC<InputProps> = ({
  label,
  task,
  question,
  guidance,
  resources,
  options,
  selectedOption,
  onResultChange,
  onOptionChange,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onOptionChange(selectedValue);
    const selectedOption = options.find(
      (option) => option.label === selectedValue
    );
    if (selectedOption) {
      const result = selectedOption.value;
      onResultChange(result);
    }
  };

  return (
    <div className="py-2 pb-1">
      <div className="text-2xl">{label}</div>
      <div className="text-[8px]">{`Estimate: ${task}`}</div>
      <div className="text-[8px]">{`Question: ${question}`}</div>
      <div className="text-[8px] font-bold">{`Guidance: ${guidance}`}</div>
      <div className="flex text-[8px] gap-1">
        <div>Resources:</div>
        {resources.map((r) => (
          <a
            target="_blank"
            rel="noreferrer"
            className="border border-gray-300 px-2 rounded-lg"
            href={r.url}
          >
            {r.label}
          </a>
        ))}
      </div>
      <div>
        <select
          value={selectedOption || ""}
          onChange={handleOptionChange}
          className="form-select mt-1 block w-full rounded-md bg-white-200 text-gray-800 text-xl bg-blue-200"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ViableStartupCalculator: React.FC = () => {
  const [inputResults, setInputResults] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [reasons, setReasons] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [businessLabels, setBusinessLabels] = useState<string[]>(["", ""]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    let yGap = 4;
    let xPos = 10;
    let titleSize = 12;
    let textSize = 8;

    doc.setFontSize(12);
    doc.text("Is My Startup Viable?", xPos, yPos);
    yPos += yGap;

    doc.setFontSize(textSize - 3);
    doc.text(
      "Jason Cohen's 'Excuse me, is there a problem?' (https://longform.asmartbear.com/problem/)",
      xPos,
      yPos
    );
    yPos += yGap - 1;
    doc.text(
      "Calculator (www.adthatch.com/is-my-startup-viable-calculator)",
      xPos,
      yPos
    );
    yPos += yGap - 1;
    doc.text("Say hello (https://www.linkedin.com/in/brntsllvn)", xPos, yPos);
    yPos += yGap + 5;

    doc.setFontSize(titleSize);
    doc.text("Name of Startup", xPos, yPos);
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(businessLabels[0], xPos, yPos);
    yPos += yGap;

    yPos += yGap;
    doc.setFontSize(titleSize);
    doc.text("Startup Idea", xPos, yPos);
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(businessLabels[1], xPos, yPos);
    yPos += yGap;

    optionsArray.forEach((option, index) => {
      yPos += yGap;
      doc.setFontSize(titleSize);
      doc.text(option.label, xPos, yPos);
      yPos += yGap;
      doc.setFontSize(textSize);
      doc.text(selectedOptions[index], xPos, yPos);
      yPos += yGap;
      doc.setFontSize(textSize);
      doc.text(`Rationale: ${reasons[index]}`, xPos, yPos);
      yPos += yGap;
    });

    yPos += yGap;
    doc.setFontSize(titleSize);
    doc.text(`Score: ${totalResult.toFixed(2)}`, xPos, yPos); // rounded to two decimal places
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(`Result: ${calculateResult(totalResult)}`, xPos, yPos);
    doc.setFontSize(textSize - 3);
    yPos += yGap + 5;
    const timestamp =
      new Date().toISOString().replace("T", " ").split(".")[0] + " UTC";
    doc.text(`Calculated ${timestamp}`, xPos, yPos);

    doc.save("is-my-startup-viable.pdf");
  };

  const handleInputOptionChange = (index: number, option: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = option;
      return newOptions;
    });
  };

  const handleReasonChange = (index: number, reason: string) => {
    setReasons((prevReasons) => {
      const newReasons = [...prevReasons];
      newReasons[index] = reason;
      return newReasons;
    });
  };

  const handleFillExampleData = (
    exampleBusinessName: string,
    exampleBusinessH1: string,
    exampleData: { result: number; option: string }[]
  ) => {
    const exampleResults = exampleData.map((data) => data.result);
    setInputResults(exampleResults);
    const exampleOptions = exampleData.map((data) => data.option);
    setSelectedOptions(exampleOptions);
    setBusinessLabels([exampleBusinessName, exampleBusinessH1]);
  };

  const handleInputResultChange = (index: number, result: number) => {
    setInputResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result;
      return newResults;
    });
  };

  const calculateTotalResult = () => {
    return inputResults.reduce((total, result) => total * result, 1) / 625000;
  };

  const handleBizBasicsChange = (index: number, label: string) => {
    setBusinessLabels((prevLabels) => {
      const newLabels = [...prevLabels];
      newLabels[index] = label;
      return newLabels;
    });
  };

  const totalResult = calculateTotalResult();

  const calculateResult = (totalResult: number) => {
    if (totalResult >= 4) {
      return "Scale Up";
    } else if (totalResult >= 2) {
      return "Self-Fund";
    } else if (totalResult === 0) {
      return "TBD";
    } else {
      return "Not viable";
    }
  };

  const calculateResultColor = (totalResult: number) => {
    if (totalResult >= 10) {
      return "bg-green-400";
    } else if (totalResult >= 4) {
      return "bg-green-200";
    } else if (totalResult >= 2) {
      return "bg-green-100";
    } else if (totalResult >= 1) {
      return "bg-red-200";
    } else if (totalResult >= 0.1) {
      return "bg-red-300";
    } else if (totalResult === 0) {
      return "bg-stone-100";
    } else {
      return "bg-red-500";
    }
  };

  let bgColorClass = calculateResultColor(totalResult);

  const allOptions = {
    audienceBillion: {
      value: 1000000000,
      label: "1,000,000,000 businesses or people",
    },
    audienceHundredMillion: {
      value: 100000000,
      label: "100,000,000 businesses or people",
    },
    audienceTenMillion: {
      value: 10000000,
      label: "10,000,000 businesses or people",
    },
    audienceMillion: {
      value: 1000000,
      label: "1,000,000 businesses or people",
    },
    audienceHundredThousand: {
      value: 100000,
      label: "100,000 businesses or people",
    },
    audienceTenThousand: { value: 10000, label: "10,000 businesses or people" },
    audienceThousand: { value: 1000, label: "1,000 businesses or people" },
    awareFewAgree: {
      value: 0.01,
      label: "0.01: Few know or care to solve",
    },
    awareThoughtLeaders: {
      value: 0.1,
      label: "0.1: Thought-leaders want it solved",
    },
    awareIndustryStandard: {
      value: 0.5,
      label: "0.5: Many people want it solved",
    },
    awareHardToFind: {
      value: 1.0,
      label: "1: Almost everyone wants it solved",
    },
    budgetMillion: { value: 1000000, label: "$1,000,000 annual spend" },
    budgetHundredThousand: { value: 100000, label: "$100,000 annual spend" },
    budgetTenThousand: { value: 10000, label: "$10,000 annual spend" },
    budgetThousand: { value: 1000, label: "$1,000 annual spend" },
    budgetHundred: { value: 100, label: "$100 annual spend" },
    budgetTen: { value: 10, label: "$10 annual spend" },
    budgetOne: { value: 1, label: "$1 annual spend" },
    liquidRare: {
      value: 0.01,
      label: "0.01: Switch every few years, hard to switch",
    },
    liquidAnnual: {
      value: 0.1,
      label: "0.1: Switch once a year, moderately challenging to switch",
    },
    liquidAlways: {
      value: 1.0,
      label: "1: Always in the market, easy to switch",
    },
    trustNo: { value: 0, label: "0: They cannot buy from you" },
    trustChallenge: { value: 0.1, label: "0.1: Serious trust challenges" },
    trustIndifferent: {
      value: 0.5,
      label: "0.5: Indifferent or low-trust product",
    },
    trustYou: { value: 1.0, label: "1: Emotional desire to select you" },
    competitionDifficult: {
      value: 0.1,
      label: "0.1: No material differentiation",
    },
    competitionSomeFeatures: {
      value: 0.5,
      label: "0.5: Some best-in-class features",
    },
    competitionNoAlternative: {
      value: 1.0,
      label: "1: No viable alternative",
    },
    enduringOneOff: {
      value: 0.01,
      label: "0.01: One-off purchase without loyalty",
    },
    enduringOneEvangelism: {
      value: 0.1,
      label: "0.1: One-off purchase with evangelism",
    },
    enduringRecurring: {
      value: 0.5,
      label: "0.5: Recurring revenue or problem",
    },
    enduringLockIn: { value: 1.0, label: "1.0: Strong lock-in" },
  };

  const optionsArray = [
    {
      label: "Audience",
      task: "Number of potential customers (consumers or businesses)",
      question: "Do 10M+ people or 100k+ orgs have the problem?",
      guidance: "Go B2B. Businesses pay for solutions. Consumers hate spending",
      resources: [
        {
          label: "Jason's talk",
          url: "https://www.youtube.com/watch?v=otbnC2zE2rw&t=24m28s",
        },
        {
          label: "Starter Story",
          url: "https://www.linkedin.com/posts/patrickwalls_how-to-make-2x-more-money-with-one-simple-activity-7085650547940175875-nw3z",
        },
      ],
      options: [
        allOptions.audienceBillion,
        allOptions.audienceHundredMillion,
        allOptions.audienceTenMillion,
        allOptions.audienceMillion,
        allOptions.audienceHundredThousand,
        allOptions.audienceTenThousand,
        allOptions.audienceThousand,
      ],
    },
    {
      label: "Budget",
      task: "Customers' annual budget for the problem",
      question: "If there's budget at all, is the budget large enough?",
      guidance: "Many great ideas solve real problems with no budget and fail",
      resources: [
        {
          label: "Mom Test",
          url: "https://www.momtestbook.com/",
        },
        {
          label: "Startup Owner's Manual",
          url: "https://steveblank.com/startup-owners-manual-1in/",
        },
      ],
      options: [
        allOptions.budgetMillion,
        allOptions.budgetHundredThousand,
        allOptions.budgetTenThousand,
        allOptions.budgetThousand,
        allOptions.budgetHundred,
        allOptions.budgetTen,
        allOptions.budgetOne,
      ],
    },
    {
      label: "Aware",
      task: "How urgent/important it is for your audience to solve the problem",
      question:
        "Does the audience know they have a problem and care to solve it now?",
      guidance: "The goal is to uncover the truth, not to sell",
      resources: [
        {
          label: "Customer Development",
          url: "https://longform.asmartbear.com/customer-development/",
        },
        {
          label: "Mom Test",
          url: "https://www.momtestbook.com/",
        },
        {
          label: "Startup Owner's Manual",
          url: "https://steveblank.com/startup-owners-manual-1in/",
        },
      ],
      options: [
        allOptions.awareFewAgree,
        allOptions.awareThoughtLeaders,
        allOptions.awareIndustryStandard,
        allOptions.awareHardToFind,
      ],
    },
    {
      label: "Liquid",
      task: "How frequently customers buy and how hard it is to switch",
      question: "Does a prospect have the organizational will to buy from you?",
      guidance:
        "Long-term contracts, data migration, and integrations are barriers",
      resources: [],
      options: [
        allOptions.liquidRare,
        allOptions.liquidAnnual,
        allOptions.liquidAlways,
      ],
    },
    {
      label: "Trust",
      task: "Prospects' willingness to trust you",
      question:
        "Do they trust your product, record, security, support, future?",
      guidance: "Combine joy, skill, and need for 'Love' products",
      resources: [
        {
          label: "Willingness to Pay",
          url: "https://longform.asmartbear.com/willingness-to-pay/",
        },
        {
          label: "Fulfillment",
          url: "https://longform.asmartbear.com/fulfillment/",
        },
      ],
      options: [
        allOptions.trustNo,
        allOptions.trustChallenge,
        allOptions.trustIndifferent,
        allOptions.trustYou,
      ],
    },
    {
      label: "Competition",
      task: "Your competitive differentiation",
      question:
        "Is your product sufficiently different? Does enough of the market care?",
      guidance:
        "Even better than different is to be extreme in that difference",
      resources: [
        {
          label: "Worse, but unique",
          url: "https://longform.asmartbear.com/worse-but-unique/",
        },
        {
          label: "Purple Cow",
          url: "https://en.wikipedia.org/wiki/Purple_Cow:_Transform_Your_Business_by_Being_Remarkable",
        },
        {
          label: "So Good They Can't Ignore You",
          url: "https://www.youtube.com/watch?v=qwOdU02SE0w",
        },
      ],
      options: [
        allOptions.competitionDifficult,
        allOptions.competitionSomeFeatures,
        allOptions.competitionNoAlternative,
      ],
    },
    {
      label: "Enduring",
      task: "Will they still be a customer a year from now? Is the pain temporary?",
      question: "What drives attrition? Is the pain temporary?",
      guidance:
        "5%/mo cancellation leads to 50% annual loss. Even one-offs need repeat revenue",
      resources: [
        {
          label: "Naturally recurring revenue",
          url: "https://www.youtube.com/watch?v=otbnC2zE2rw&t=28m57s",
        },
        {
          label: "Impossible to become a unicorn with high churn",
          url: "https://cloud.substack.com/p/my-top-10-mistakes-in-10-years-gainsight#%C2%A7mistake-not-starting-act-ii-fast-enough",
        },
      ],
      options: [
        allOptions.enduringOneOff,
        allOptions.enduringOneEvangelism,
        allOptions.enduringRecurring,
        allOptions.enduringLockIn,
      ],
    },
  ];

  const exampleArray = [
    {
      businessName: "WP Engine",
      businessH1: "Hosting for WordPress",
      color: "bg-green-300",
      revenue: "$240 MM",
      data: [
        {
          result: allOptions.audienceHundredMillion.value,
          option: allOptions.audienceHundredMillion.label,
        },
        {
          result: allOptions.awareThoughtLeaders.value,
          option: allOptions.awareThoughtLeaders.label,
        },
        {
          result: allOptions.budgetHundred.value,
          option: allOptions.budgetHundred.label,
        },
        {
          result: allOptions.liquidRare.value,
          option: allOptions.liquidRare.label,
        },
        {
          result: allOptions.trustIndifferent.value,
          option: allOptions.trustIndifferent.label,
        },
        {
          result: allOptions.competitionSomeFeatures.value,
          option: allOptions.competitionSomeFeatures.label,
        },
        {
          result: allOptions.enduringLockIn.value,
          option: allOptions.enduringLockIn.label,
        },
      ],
    },
    {
      businessName: "ConvertKit",
      businessH1: "Marketing for creators",
      color: "bg-green-200",
      revenue: "$33.5 MM",
      data: [
        {
          result: allOptions.audienceTenMillion.value,
          option: allOptions.audienceTenMillion.label,
        },
        {
          result: allOptions.awareHardToFind.value,
          option: allOptions.awareHardToFind.label,
        },
        {
          result: allOptions.budgetHundred.value,
          option: allOptions.budgetHundred.label,
        },
        {
          result: allOptions.liquidRare.value,
          option: allOptions.liquidRare.label,
        },
        {
          result: allOptions.trustIndifferent.value,
          option: allOptions.trustIndifferent.label,
        },
        {
          result: allOptions.competitionSomeFeatures.value,
          option: allOptions.competitionSomeFeatures.label,
        },
        {
          result: allOptions.enduringRecurring.value,
          option: allOptions.enduringRecurring.label,
        },
      ],
    },
    {
      businessName: "Consumer Security",
      businessH1: "Help people protect their data",
      color: "bg-red-500",
      revenue: "$0",
      data: [
        {
          result: allOptions.audienceBillion.value,
          option: allOptions.audienceBillion.label,
        },
        {
          result: allOptions.awareFewAgree.value,
          option: allOptions.awareFewAgree.label,
        },
        {
          result: allOptions.budgetTen.value,
          option: allOptions.budgetTen.label,
        },
        {
          result: allOptions.liquidRare.value,
          option: allOptions.liquidRare.label,
        },
        {
          result: allOptions.trustIndifferent.value,
          option: allOptions.trustIndifferent.label,
        },
        {
          result: allOptions.competitionDifficult.value,
          option: allOptions.competitionDifficult.label,
        },
        {
          result: allOptions.enduringRecurring.value,
          option: allOptions.enduringRecurring.label,
        },
      ],
    },
    {
      businessName: "Airbnb",
      businessH1: "Every dwelling becomes a hotel",
      color: "bg-green-400",
      revenue: "$8.4 BN",
      data: [
        {
          result: allOptions.audienceBillion.value,
          option: allOptions.audienceBillion.label,
        },
        {
          result: allOptions.awareHardToFind.value,
          option: allOptions.awareHardToFind.label,
        },
        {
          result: allOptions.budgetHundred.value,
          option: allOptions.budgetHundred.label,
        },
        {
          result: allOptions.liquidAlways.value,
          option: allOptions.liquidAlways.label,
        },
        {
          result: allOptions.trustChallenge.value,
          option: allOptions.trustChallenge.label,
        },
        {
          result: allOptions.competitionSomeFeatures.value,
          option: allOptions.competitionSomeFeatures.label,
        },
        {
          result: allOptions.enduringOneEvangelism.value,
          option: allOptions.enduringOneEvangelism.label,
        },
      ],
    },
    {
      businessName: "Zillow",
      businessH1: "High-quality leads for real-estate agents",
      color: "bg-green-400",
      revenue: "$1.9 BN",
      data: [
        {
          result: allOptions.audienceMillion.value,
          option: allOptions.audienceMillion.label,
        },
        {
          result: allOptions.awareIndustryStandard.value,
          option: allOptions.awareIndustryStandard.label,
        },
        {
          result: allOptions.budgetThousand.value,
          option: allOptions.budgetThousand.label,
        },
        {
          result: allOptions.liquidAlways.value,
          option: allOptions.liquidAlways.label,
        },
        {
          result: allOptions.trustIndifferent.value,
          option: allOptions.trustIndifferent.label,
        },
        {
          result: allOptions.competitionSomeFeatures.value,
          option: allOptions.competitionSomeFeatures.label,
        },
        {
          result: allOptions.enduringRecurring.value,
          option: allOptions.enduringRecurring.label,
        },
      ],
    },
    {
      businessName: "Intuit",
      businessH1: "Consumer tax preparation",
      color: "bg-green-400",
      revenue: "$12.7 BN",
      data: [
        {
          result: allOptions.audienceHundredMillion.value,
          option: allOptions.audienceHundredMillion.label,
        },
        {
          result: allOptions.awareHardToFind.value,
          option: allOptions.awareHardToFind.label,
        },
        {
          result: allOptions.budgetHundred.value,
          option: allOptions.budgetHundred.label,
        },
        {
          result: allOptions.liquidAnnual.value,
          option: allOptions.liquidAnnual.label,
        },
        {
          result: allOptions.trustYou.value,
          option: allOptions.trustYou.label,
        },
        {
          result: allOptions.competitionSomeFeatures.value,
          option: allOptions.competitionSomeFeatures.label,
        },
        {
          result: allOptions.enduringOneEvangelism.value,
          option: allOptions.enduringOneEvangelism.label,
        },
      ],
    },
  ];

  return (
    <div className="pb-64">
      <Nav />
      <div>
        <div id="calculator">
          <div className="min-h-min flex items-center justify-center px-2 mt-8">
            <div
              className={`w-full max-w-md mx-auto px-4 py-8 ${bgColorClass} rounded-lg shadow-md`}
            >
              <h1 className="text-black text-3xl font-bold text-center mb-2">
                Is My Startup Viable?
              </h1>
              <h2 className="text-[16px] text-center mb-3">
                For bootstrapped and vc-backable startups
              </h2>
              <div className="text-[8px] text-center mb-1">
                Based on Jason Cohen's{" "}
                <a
                  className="underline"
                  href="https://longform.asmartbear.com/problem/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Excuse me, is there a problem?
                </a>
              </div>
              <div className="text-[8px] text-center mb-1">
                See{" "}
                <a
                  className="underline"
                  href="https://longform.asmartbear.com/roi-rubric/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Fermi Estimation
                </a>{" "}
                for why this calculator is useful
              </div>
              <div className="text-[8px] text-center mb-4">
                See{" "}
                <a
                  className="underline"
                  href="https://youtu.be/otbnC2zE2rw"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jason's conference talk
                </a>{" "}
                for additional context
              </div>
              <div className="pb-4 border-b border-gray-400">
                <div className="flex justify-between items-center mt-2">
                  <div className="text-black font-semibold">
                    Score: {totalResult}
                  </div>
                  <div className="text-black font-semibold">
                    Result: {calculateResult(totalResult)}
                  </div>
                  <button
                    onClick={downloadPDF}
                    className="text-black font-semibold border border-gray-300 py-1 px-2 rounded-lg"
                  >
                    Save as PDF
                  </button>
                </div>
                <div className="flex items-center justify-center gap-x-3 mt-2 text-[7px]">
                  <div className="text-black">4 or more: vc-backable</div>
                  <div className="text-black">2 or more: bootstrap</div>
                  <div className="text-black">less than 2: not viable</div>
                  <div className="text-black">
                    <a
                      className="underline"
                      href="https://longform.asmartbear.com/problem/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      See exceptions
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="border-b border-gray-400">
                  <div className="text-xl mt-4">Examples</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 items-center mt-2 mb-6 text-[12px] text-black gap-1">
                    {exampleArray.map((example) => (
                      <button
                        className={`border border-gray-300 py-2 rounded-lg ${example.color}`}
                        onClick={() =>
                          handleFillExampleData(
                            example.businessName,
                            example.businessH1,
                            example.data
                          )
                        }
                      >
                        <div>{example.businessName}</div>
                        <div className="text-[8px]">
                          2022 Revenue: {example.revenue}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="rounded-lg mt-4 mt-10">
                  <div className="py-2 pb-1">
                    <label className="block">
                      <span className="text-black text-2xl">
                        Name of startup
                      </span>
                      <div className="text-[8px] pb-1">
                        Helpful for capturing the business in one(ish) word
                      </div>
                      <input
                        className="form-input block w-full rounded-md bg-white-200 text-black text-xl p-2 h-6 bg-blue-200"
                        type="text"
                        value={businessLabels[0]}
                        onChange={(e) =>
                          handleBizBasicsChange(0, e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div className="py-2 pb-1">
                    <label className="block">
                      <span className="text-black text-2xl">
                        Startup idea in one sentence
                      </span>
                      <div className="text-[8px] pb-1">
                        What would the "h1" tag on your main landing page say?
                      </div>
                      <input
                        className="form-input block w-full rounded-md bg-white-200 text-black text-xl p-2 h-6 bg-blue-200"
                        type="text"
                        value={businessLabels[1]}
                        onChange={(e) =>
                          handleBizBasicsChange(1, e.target.value)
                        }
                      />
                    </label>
                  </div>
                </div>
                {optionsArray.map((optionData, index) => (
                  <div>
                    <InputWithDropdown
                      key={index}
                      label={optionData.label}
                      task={optionData.task}
                      question={optionData.question}
                      guidance={optionData.guidance}
                      resources={optionData.resources}
                      options={optionData.options}
                      selectedOption={selectedOptions[index]}
                      onResultChange={(result) =>
                        handleInputResultChange(index, result)
                      }
                      onOptionChange={(option) =>
                        handleInputOptionChange(index, option)
                      }
                    />
                    <div className="pb-1 flex gap-1">
                      <span className="text-black text-[8px]">Why?</span>
                      <input
                        className="form-input block w-full rounded-md bg-white-200 text-black text-[8px] h-3 pl-2"
                        type="text"
                        value={reasons[index]}
                        onChange={(e) =>
                          handleReasonChange(index, e.target.value)
                        }
                        placeholder="Record your rationale..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id="notes">
          <div className="min-h-min flex items-center justify-center px-2 mt-8">
            <div
              className={`w-full max-w-md mx-auto px-4 py-8 ${bgColorClass} rounded-lg shadow-md text-center`}
            >
              <div className="text-black text-3xl font-bold text-center">
                <h2 className="my-1">Feedback?</h2>
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-sm font-normal"
                  href="mailto:brent@adthatch.com?subject=I%20tried%20your%20viable%20startup%20calculator%20and..."
                >
                  Email
                </a>
                {"   "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="underline text-sm font-normal"
                  href="https://www.linkedin.com/in/brntsllvn"
                >
                  LinkedIn
                </a>
                <h2 className="my-4">Constraints</h2>
                <p className="text-sm font-normal">
                  What happens if you set a result target (e.g. 4) and back out
                  the business characteristics? Does this align with your
                  intuition?
                </p>
                <h2 className="my-4">What's Missing?</h2>
                <p className="text-sm font-normal mb-4">
                  The following elements are <i>sorta</i> captured by the
                  questions above, but here's a list for completeness...
                </p>
                <ul className="text-xs font-normal text-left list-disc ml-4 lg:ml-6 space-y-0">
                  <li>Go-to-market strategy</li>
                  <li>
                    Barriers to scalability (see{" "}
                    <a
                      href="https://www.amazon.com/Crossing-Chasm-3rd-Disruptive-Mainstream/dp/0062292986/ref=sr_1_1?keywords=crossing+the+chasm&qid=1691701799&s=books&sprefix=crossing+the+ch%2Cstripbooks%2C171&sr=1-1"
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Crossing The Chasm
                    </a>
                    )
                  </li>
                  <li>
                    Industry-specific nuance (see{" "}
                    <a
                      href="https://www.linkedin.com/posts/peterjameswalker_cartadata-seed-fundraising-activity-7091839982151090176-QuPU"
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Carta data
                    </a>
                    )
                  </li>
                  <li>Moat analysis</li>
                  <li>Solution: hardware, software, etc.</li>
                  <li>Solution type: system of record, engagement, decision</li>
                  <li>
                    Social atomic unit (see{" "}
                    <a
                      href="https://www.amazon.com/Cold-Start-Problem-Andrew-Chen/dp/0062969749"
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      The Cold Start Problem
                    </a>
                    )
                  </li>
                  <li>
                    Unit economics (or CAC/LTV) (see{" "}
                    <a
                      href="https://www.hustlefund.vc/blog-posts-founders/top-of-mind-why-unit-economics-matter"
                      className="underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Hustle Fund
                    </a>
                    )
                  </li>
                </ul>
                <h2 className="my-4">This Calculator is Wrong!</h2>
                <p className="text-sm font-normal">
                  See{" "}
                  <a
                    href="https://longform.asmartbear.com/problem/"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    exceptions
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViableStartupCalculator;
