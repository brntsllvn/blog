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
  onResultChange: (result: number) => void;
  onOptionChange: (option: string) => void;
  selectedOption: string;
}

const InputWithDropdown: React.FC<InputProps> = ({
  label,
  task,
  question,
  guidance,
  resources,
  options,
  onResultChange,
  onOptionChange,
  selectedOption,
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
      <div>{label}</div>
      <div className="text-[8px]">{`Estimate: ${task}`}</div>
      <div className="text-[8px]">{`Question: ${question}`}</div>
      <div className="text-[8px] font-bold">{`Guidance: ${guidance}`}</div>
      <div className="flex text-[8px] gap-1 pb-1">
        <div>Sources:</div>
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
          className="form-select mt-1 block w-full rounded-md bg-white-200 text-gray-800"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option className="text-sm" key={option.value} value={option.label}>
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
  const [businessLabels, setBusinessLabels] = useState<string[]>(["", ""]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    let yGap = 4;
    let xPos = 10;
    let titleSize = 10;
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
    if (totalResult >= 4) {
      return "bg-green-400";
    } else if (totalResult >= 2) {
      return "bg-green-200";
    } else if (totalResult >= 1) {
      return "bg-red-400";
    } else if (totalResult >= 0.1) {
      return "bg-red-500";
    } else if (totalResult === 0) {
      return "bg-stone-200";
    } else {
      return "bg-red-600";
    }
  };

  let bgColorClass = calculateResultColor(totalResult);

  const optionsArray = [
    {
      label: "Audience Size",
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
        { value: 1000000000, label: "1,000,000,000" },
        { value: 100000000, label: "100,000,000" },
        { value: 10000000, label: "10,000,000" },
        { value: 1000000, label: "1,000,000" },
        { value: 100000, label: "100,000" },
        { value: 10000, label: "10,000" },
        { value: 1000, label: "1,000" },
      ],
    },
    {
      label: "Self-Aware Market",
      task: "How urgent/important it is for your audience to solve the problem",
      question:
        "Does the audience know they have a problem and care to solve it now?",
      guidance: "The goal is to uncover the truth, not to sell",
      resources: [
        {
          label: "Jason on customer development",
          url: "https://longform.asmartbear.com/customer-development/",
        },
        {
          label: "The Mom Test",
          url: "https://www.momtestbook.com/",
        },
        {
          label: "The Startup Owner's Manual",
          url: "https://steveblank.com/startup-owners-manual-1in/",
        },
      ],
      options: [
        { value: 0.01, label: "0.01: Few agree or care" },
        {
          value: 0.1,
          label: "0.1: Thought-leaders care/evangelize",
        },
        { value: 0.5, label: "0.5: Industry standard-practice" },
        {
          value: 1.0,
          label: "1.0: Hard to find someone who doesn't care",
        },
      ],
    },
    {
      label: "Lucrative Market",
      task: "Customers' annual budget for the problem",
      question: "If there's budget at all, is the budget large enough?",
      guidance: "Many great ideas solve real problems with no budget and fail",
      resources: [
        {
          label: "The Mom Test",
          url: "https://www.momtestbook.com/",
        },
        {
          label: "The Startup Owner's Manual",
          url: "https://steveblank.com/startup-owners-manual-1in/",
        },
      ],
      options: [
        { value: 1000000, label: "$1,000,000" },
        { value: 100000, label: "$100,000" },
        { value: 10000, label: "$10,000" },
        { value: 1000, label: "$1,000" },
        { value: 100, label: "$100" },
        { value: 10, label: "$10" },
        { value: 1, label: "$1" },
      ],
    },
    {
      label: "Liquid Market",
      task: "How frequently customers buy and how hard it is to switch",
      question: "Does a prospect have the organizational will to buy from you?",
      guidance:
        "Long-term contracts, data migration, and integrations are barriers",
      resources: [],
      options: [
        { value: 0.01, label: "0.01: Every few years, hard to switch" },
        { value: 0.1, label: "0.1: Once a year, moderate challenge to switch" },
        { value: 1.0, label: "1.0: Always in the market, easy to switch" },
      ],
    },
    {
      label: "Eager To Buy From You Specifically?",
      task: "Prospects' willingness to trust you",
      question:
        "Do they trust your product, record, security, support, future?",
      guidance: "Combine joy, skill, and need for 'Love' products",
      resources: [
        {
          label: "Jason on willingness to pay",
          url: "https://longform.asmartbear.com/willingness-to-pay/",
        },
        {
          label: "Jason on fulfillment",
          url: "https://longform.asmartbear.com/fulfillment/",
        },
      ],
      options: [
        { value: 0, label: "0: They cannot buy from you" },
        { value: 0.1, label: "0.1: Serious trust challenges" },
        { value: 0.5, label: "0.5: Indifferent or low-trust product" },
        { value: 1.0, label: "1.0: Emotional desire to select you" },
      ],
    },
    {
      label: "Eager To Buy From You Versus Competition?",
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
        { value: 0.1, label: "0.1: No material differentiation" },
        { value: 0.5, label: "0.5: Some best-in-class features" },
        { value: 1.0, label: "1.0: No viable alternative" },
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
        { value: 0.01, label: "0.01: One-off purchase without loyalty" },
        { value: 0.1, label: "0.1: One-off purchase with evangelism" },
        { value: 0.5, label: "0.5: Recurring revenue or problem" },
        { value: 1.0, label: "1.0: Strong lock-in" },
      ],
    },
  ];

  const exampleArray = [
    {
      businessName: "WP Engine",
      businessH1: "Hosting for WordPress",
      data: [
        { result: 100000000, option: "100,000,000" },
        { result: 0.1, option: "0.1: Thought-leaders care/evangelize" },
        { result: 100, option: "$100" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent or low-trust product" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 1.0, option: "1.0 : Strong lock-in" },
      ],
    },
    {
      businessName: "ConvertKit",
      businessH1: "Marketing for creators",
      data: [
        { result: 10000000, option: "10,000,000" },
        { result: 1.0, option: "1.0: Hard to find someone who doesn't care" },
        { result: 100, option: "$100" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent or low-trust product" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 0.5, option: "0.5: Recurring revenue or problem" },
      ],
    },
    {
      businessName: "Consumer Security",
      businessH1: "Help people protect their data",
      data: [
        { result: 1000000000, option: "1,000,000,000" },
        { result: 0.01, option: "0.01: Few agree or care" },
        { result: 10, option: "$10" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent or low-trust product" },
        { result: 0.1, option: "0.1: No material differentiation" },
        { result: 0.5, option: "0.5: Recurring revenue or problem" },
      ],
    },
    {
      businessName: "Airbnb",
      businessH1: "Every dwelling becomes a hotel",
      data: [
        { result: 1000000000, option: "1,000,000,000" },
        { result: 1.0, option: "1.0: Hard to find someone who doesn't care" },
        { result: 100, option: "$100" },
        {
          result: 1.0,
          option: "1.0: Always in the market, easy to switch",
        },
        { result: 0.1, option: "0.1: Serious trust challenges" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 0.5, option: "0.5: Recurring revenue or problem" },
      ],
    },
    {
      businessName: "Zillow",
      businessH1: "High-quality leads for real-estate agents",
      data: [
        { result: 1000000, option: "1,000,000" },
        { result: 0.5, option: "0.5: Industry standard-practice" },
        { result: 10000, option: "$10,000" },
        {
          result: 1.0,
          option: "1.0: Always in the market, easy to switch",
        },
        { result: 0.5, option: "0.5: Indifferent or low-trust product" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 0.5, option: "0.5: Recurring revenue or problem" },
      ],
    },
  ];

  return (
    <div className="pb-64">
      <Nav />
      <div className="min-h-min flex items-center justify-center px-2 mt-8">
        <div
          className={`w-full max-w-md mx-auto px-4 py-8 ${bgColorClass} rounded-lg shadow-md`}
        >
          <h1 className="text-black text-2xl font-bold text-center mb-2">
            Is My Startup Viable?
          </h1>
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
          <div className="flex justify-between items-center mt-2">
            <div className="text-black font-semibold text-sm">
              Score: {totalResult}
            </div>
            <div className="text-black font-semibold text-sm">
              Result: {calculateResult(totalResult)}
            </div>
            <button
              onClick={downloadPDF}
              className="text-black font-semibold text-sm border border-gray-300 py-1 px-2 rounded-lg"
            >
              Save as PDF
            </button>
          </div>
          <div>
            <div className="border-b border-gray-400">
              <div className="text-xs mt-4">Examples</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center mt-4 mb-6 text-[8px] text-black gap-3 ">
                {exampleArray.map((example) => (
                  <button
                    className="border border-gray-300 py-1 rounded-lg"
                    onClick={() =>
                      handleFillExampleData(
                        example.businessName,
                        example.businessH1,
                        example.data
                      )
                    }
                  >
                    {example.businessName}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-lg mt-4 mt-10">
              <div className="py-2 pb-1">
                <label className="block">
                  <span className="text-black">Name of startup</span>
                  <div className="text-[9px] pb-1">
                    Helpful for capturing the business in one(ish) word
                  </div>
                  <input
                    className="form-input block w-full rounded-md bg-white-200 text-black text-sm p-2 h-5"
                    type="text"
                    value={businessLabels[0]}
                  />
                </label>
              </div>
              <div className="py-2 pb-1">
                <label className="block">
                  <span className="text-black">
                    Startup idea in one sentence
                  </span>
                  <div className="text-[9px] pb-1">
                    What would the "h1" tag on your main landing page say?
                  </div>
                  <input
                    className="form-input block w-full rounded-md bg-white-200 text-black text-sm p-2 h-5"
                    type="text"
                    value={businessLabels[1]}
                  />
                </label>
              </div>
            </div>
            {optionsArray.map((optionData, index) => (
              <InputWithDropdown
                key={index}
                label={optionData.label}
                task={optionData.task}
                question={optionData.question}
                guidance={optionData.guidance}
                resources={optionData.resources}
                options={optionData.options}
                onResultChange={(result) =>
                  handleInputResultChange(index, result)
                }
                onOptionChange={(option) =>
                  handleInputOptionChange(index, option)
                }
                selectedOption={selectedOptions[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViableStartupCalculator;
