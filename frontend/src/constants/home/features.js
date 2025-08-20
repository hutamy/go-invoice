import {
  CloudArrowUpIcon,
  LockClosedIcon,
  DocumentArrowDownIcon,
  CalculatorIcon,
} from "@heroicons/react/24/outline";

const Features = [
  {
    name: "Easy Invoice Creation",
    description:
      "Create professional invoices in seconds with a simple, intuitive interface. No design skills required.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Automatic Tax Calculations",
    description:
      "Let the app handle tax calculations for you, including VAT, GST, or custom rates, to ensure accuracy.",
    icon: CalculatorIcon,
  },
  {
    name: "Download & Share as PDF",
    description:
      "Easily download invoices as PDF files or share them directly with your clients via email.",
    icon: DocumentArrowDownIcon,
  },
  {
    name: "Secure Data Storage",
    description:
      "Your invoice data is securely stored and protected with industry-standard encryption.",
    icon: LockClosedIcon,
  },
];

export default Features;
