import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  Shield,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

const translations = {
  nav_home: { kn: "ಮುಖಪುಟ", en: "Home" },
  nav_deposit: { kn: "ಠೇವು ಯೋಜನೆ", en: "Deposit Schemes" },
  nav_loan: { kn: "ಸಾಲ ಯೋಜನೆ", en: "Loan Schemes" },
  nav_hours: { kn: "ಸಮಯ", en: "Hours" },
  nav_contact: { kn: "ಸಂಪರ್ಕ", en: "Contact" },
  hero_org_line1: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ಕ್ರೆಡಿಟ್", en: "Karavali Karnataka Credit" },
  hero_org_line2: { kn: "ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿ.", en: "Souharda Sahakari Sangha Ni." },
  hero_city: { kn: "ಹುಬ್ಬಳ್ಳಿ", en: "Hubballi" },
  hero_tagline: { kn: "ನಿಮ್ಮ ಉಳಿತಾಯವನ್ನು ಸಮೃದ್ಧಗೊಳಿಸಿ — ಆಕರ್ಷಕ ಬಡ್ಡಿ ದರದಲ್ಲಿ ಠೇವು ಮತ್ತು ಸಾಲ ಸೇವೆ", en: "Grow your savings — deposits and loans at attractive interest rates" },
  hero_cta_contact: { kn: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ಸಂಪರ್ಕಿಸಿ", en: "Contact Us for More Info" },
  hero_cta_deposit: { kn: "ಠೇವು ಯೋಜನೆ ನೋಡಿ", en: "View Deposit Schemes" },
  stat_deposit_interest: { kn: "ಗರಿಷ್ಠ ಠೇವು ಬಡ್ಡಿ", en: "Max Deposit Interest" },
  stat_double: { kn: "8 ವರ್ಷದಲ್ಲಿ ದ್ವಿಗುಣ", en: "Doubles in 8 Years" },
  stat_deposit_schemes: { kn: "ಠೇವು ಯೋಜನೆಗಳು", en: "Deposit Schemes" },
  stat_loan_schemes: { kn: "ಸಾಲ ಯೋಜನೆಗಳು", en: "Loan Schemes" },
  deposit_badge: { kn: "ಠೇವು ಯೋಜನೆ", en: "Deposit Schemes" },
  deposit_heading: { kn: "ಆಕರ್ಷಕ ಠೇವು ಯೋಜನೆಗಳು", en: "Attractive Deposit Schemes" },
  deposit_sub: { kn: "ನಿಮ್ಮ ಹಣವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಇಟ್ಟು ಉತ್ತಮ ಬಡ್ಡಿ ಗಳಿಸಿ", en: "Keep your money safe and earn excellent interest" },
  deposit_more_info: { kn: "ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಪಡೆಯಿರಿ", en: "Get More Information" },
  deposit_max_interest: { kn: "ಗರಿಷ್ಠ ಬಡ್ಡಿ", en: "Max Interest" },
  fd_title: { kn: "ಮುದ್ದತ್ತ ಠೇವು", en: "Fixed Deposit" },
  fd_6m: { kn: "6 ತಿಂಗಳು", en: "6 Months" },
  fd_12m: { kn: "12 ತಿಂಗಳು", en: "12 Months" },
  fd_24m: { kn: "24 ತಿಂಗಳು ಹಾಗೂ ಮೇಲ್ಪಟ್ಟು", en: "24 Months & Above" },
  fd_note: { kn: "ಹಿರಿಯ ನಾಗರಿಕರಿಗೆ, ವಿಧವೆಯರಿಗೆ, ಅಂಗವಿಕಲರಿಗೆ ಹಾಗೂ ಮಾಜಿ ಸೈನಿಕರಿಗೆ 0.25% ಹೆಚ್ಚಿಗೆ", en: "Additional 0.25% for senior citizens, widows, differently-abled, and ex-servicemen" },
  rd_title: { kn: "ಮಾಸಿಕ ಕಂತು ಠೇವು", en: "Recurring Deposit" },
  rd_12m: { kn: "12 ತಿಂಗಳು", en: "12 Months" },
  rd_24m: { kn: "24 ತಿಂಗಳು", en: "24 Months" },
  rd_36m: { kn: "36 ತಿಂಗಳು", en: "36 Months" },
  rd_highlight_label: { kn: "36 ತಿಂಗಳಿಗೆ", en: "For 36 Months" },
  mid_title: { kn: "ಮಾಸಿಕ ಆದಾಯ ಠೇವು", en: "Monthly Income Deposit" },
  mid_subtitle: { kn: "Monthly Income (ತಿಂಗಳ ಬಡ್ಡಿ)", en: "Monthly Income (Monthly Interest)" },
  mid_12m: { kn: "12 ತಿಂಗಳು", en: "12 Months" },
  mid_24m: { kn: "24 ತಿಂಗಳು ಹಾಗೂ ಮೇಲ್ಪಟ್ಟು", en: "24 Months & Above" },
  mid_highlight_label: { kn: "24 ತಿಂಗಳಿಗೆ", en: "For 24 Months" },
  double_title: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ದ್ವಿಗುಣ ಠೇವು", en: "Karavali Karnataka Double Deposit" },
  double_highlight_label: { kn: "8 ವರ್ಷದಲ್ಲಿ", en: "In 8 Years" },
  double_special_text: { kn: "8 ವರ್ಷದಲ್ಲಿ ತಮ್ಮ ಹಣ ದ್ವಿಗುಣಗೊಳ್ಳುವುದು", en: "Your money doubles in 8 years" },
  double_years_label: { kn: "8 ವರ್ಷ", en: "8 Years" },
  loan_badge: { kn: "ಸಾಲ ಯೋಜನೆ", en: "Loan Schemes" },
  loan_heading: { kn: "ಸಾಲ ಯೋಜನೆಗಳು", en: "Loan Schemes" },
  loan_sub: { kn: "ನಿಮ್ಮ ಕನಸು ನನಸಾಗಿಸಲು ಸರಳ ಮತ್ತು ತ್ವರಿತ ಸಾಲ ಸೇವೆ", en: "Simple and quick loan service to fulfill your dreams" },
  loan_contact_btn: { kn: "ಸಾಲಕ್ಕಾಗಿ ಸಂಪರ್ಕಿಸಿ", en: "Contact for Loan" },
  loan_cta_heading: { kn: "ಸಾಲ ಬೇಕೇ? ಇಂದೇ ಸಂಪರ್ಕಿಸಿ!", en: "Need a Loan? Contact Us Today!" },
  loan_cta_sub: { kn: "ತ್ವರಿತ ಅನುಮೋದನೆ, ಸುಲಭ ದಾಖಲಾತಿ, ಕಡಿಮೆ ಬಡ್ಡಿ ದರ", en: "Quick approval, easy documentation, low interest rate" },
  loan_apply_btn: { kn: "ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ", en: "Apply Now" },
  loan_cat1_title: { kn: "ಆಸ್ತಿ ಮತ್ತು ವಸತಿ ಸಾಲಗಳು", en: "Property & Housing Loans" },
  loan_cat1_l1: { kn: "ಮನೆ ನಿರ್ಮಾಣ / ರಿಪೇರಿ ಸಾಲ", en: "Home Construction / Repair Loan" },
  loan_cat1_l2: { kn: "ಭೂ ಖರೀದಿ ಮತ್ತು ವಸತಿ ಖರೀದಿ ಸಾಲ", en: "Land Purchase & Housing Purchase Loan" },
  loan_cat1_l3: { kn: "ವಾಣಿಜ್ಯ ಆಸ್ತಿ ಖರೀದಿ ಸಾಲ", en: "Commercial Property Purchase Loan" },
  loan_cat1_l4: { kn: "ಸ್ಥಿರ ಆಸ್ತಿ ಮೊರ್ಗೆಜ್ ಸಾಲ", en: "Fixed Property Mortgage Loan" },
  loan_cat2_title: { kn: "ವಾಹನ ಮತ್ತು ಉದ್ಯಮ ಸಾಲಗಳು", en: "Vehicle & Business Loans" },
  loan_cat2_l1: { kn: "ವಾಹನ ಖರೀದಿ / ಬಾಡಿಗೆ ಸಾಲ", en: "Vehicle Purchase / Rental Loan" },
  loan_cat2_l2: { kn: "ಕಾರ್ಖಾನೆ ಯಂತ್ರ ಖರೀದಿ ಸಾಲ", en: "Factory Machinery Purchase Loan" },
  loan_cat2_l3: { kn: "ಉಡ್ಡಯನ ಉದ್ಯಮ ಸಾಲ", en: "Aviation Business Loan" },
  loan_cat2_l4: { kn: "ಸಣ್ಣ ವ್ಯಾಪಾರ ಸಾಲ", en: "Small Business Loan" },
  loan_cat3_title: { kn: "ವೈಯಕ್ತಿಕ ಸಾಲಗಳು", en: "Personal Loans" },
  loan_cat3_l1: { kn: "ಶಿಕ್ಷಣ ಸಾಲ", en: "Education Loan" },
  loan_cat3_l2: { kn: "ಬಂಗಾರ ಒತ್ತೆ ಸಾಲ", en: "Gold Pledge Loan" },
  loan_cat3_l3: { kn: "ಉಪಕರಣ ಖರೀದಿ ಸಾಲ", en: "Equipment Purchase Loan" },
  loan_cat3_l4: { kn: "ಸಂಬಳ ಮೊರ್ಗೆಜ್ ಸಾಲ", en: "Salary Mortgage Loan" },
  loan_cat4_title: { kn: "ಕೃಷಿ ಸಾಲಗಳು", en: "Agricultural Loans" },
  loan_cat4_l1: { kn: "ಕೃಷಿ ಮತ್ತು ತೋಟಗಾರಿಕೆ ಸಾಲ", en: "Agriculture & Horticulture Loan" },
  loan_cat4_l2: { kn: "ಭೂ ಅಭಿವೃದ್ಧಿ ಸಾಲ", en: "Land Development Loan" },
  hours_badge: { kn: "ಕಾರ್ಯ ಸಮಯ", en: "Working Hours" },
  hours_heading: { kn: "ಕಛೇರಿ ಸಮಯ", en: "Office Hours" },
  hours_sub: { kn: "ದಿನದ ಮೂರು ಸಮಯದಲ್ಲಿ ನಮ್ಮ ಸೇವೆ ಲಭ್ಯ", en: "Our service is available three times a day" },
  hours_morning: { kn: "ಬೆಳಿಗ್ಗೆ", en: "Morning" },
  hours_afternoon: { kn: "ಮಧ್ಯಾಹ್ನ", en: "Afternoon" },
  hours_evening: { kn: "ಸಂಜೆ", en: "Evening" },
  hours_days: { kn: "ಸೋಮವಾರ ರಿಂದ ಶನಿವಾರ — ಅಧಿಕೃತ ರಜೆಯ ಹೊರತಾಗಿ", en: "Monday to Saturday — Except Public Holidays" },
  contact_badge: { kn: "ಸಂಪರ್ಕ", en: "Contact" },
  contact_heading: { kn: "ಸಂಪರ್ಕಿಸಿ", en: "Contact Us" },
  contact_sub: { kn: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಗಳಿಗೆ ನಾವು ಸಂತೋಷದಿಂದ ಉತ್ತರಿಸುತ್ತೇವೆ", en: "We are happy to answer your questions" },
  contact_org_name: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ಕ್ರೆಡಿಟ್ ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿ.", en: "Karavali Karnataka Credit Souharda Sahakari Sangha Ni." },
  contact_address_label: { kn: "ವಿಳಾಸ", en: "Address" },
  contact_address: { kn: "ಶ್ರೀತಿ ಅಶಿಯಾನ್ ಬಿಲ್ಡಿಂಗ್, ಶಿರೂರ್ ಪಾರ್ಕ್,\nವಿದ್ಯಾನಗರ, ಹುಬ್ಬಳ್ಳಿ 580 021", en: "Sriti Ashiyan Building, Shirur Park,\nVidyanagar, Hubballi 580 021" },
  contact_phone_label: { kn: "ದೂರವಾಣಿ", en: "Phone" },
  contact_email_label: { kn: "ಇಮೇಲ್", en: "Email" },
  form_heading: { kn: "ಸಂದೇಶ ಕಳುಹಿಸಿ", en: "Send a Message" },
  form_name_label: { kn: "ಹೆಸರು", en: "Name" },
  form_name_placeholder: { kn: "ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ", en: "Enter your name" },
  form_phone_label: { kn: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ", en: "Mobile Number" },
  form_phone_placeholder: { kn: "ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ", en: "Enter your mobile number" },
  form_message_label: { kn: "ಸಂದೇಶ", en: "Message" },
  form_message_placeholder: { kn: "ನಿಮ್ಮ ಸಂದೇಶ ಅಥವಾ ಪ್ರಶ್ನೆ ಇಲ್ಲಿ ಬರೆಯಿರಿ...", en: "Write your message or question here..." },
  form_submit: { kn: "ಕಳುಹಿಸಿ", en: "Send" },
  form_sending: { kn: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...", en: "Sending..." },
  form_validation_error: { kn: "ದಯವಿಟ್ಟು ಎಲ್ಲ ಮಾಹಿತಿಯನ್ನು ತುಂಬಿರಿ", en: "Please fill in all fields" },
  form_success_toast: { kn: "ನಿಮ್ಮ ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!", en: "Your message was sent successfully!" },
  form_error_toast: { kn: "ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", en: "Failed to send message. Please try again." },
  form_success_heading: { kn: "ಧನ್ಯವಾದಗಳು!", en: "Thank You!" },
  form_success_body: { kn: "ನಿಮ್ಮ ಸಂದೇಶ ಯಶಸ್ವಿಯಾಗಿ ತಲುಪಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲಿ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.", en: "Your message has been received. We will contact you shortly." },
  form_send_another: { kn: "ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ", en: "Send Another Message" },
  form_error_body: { kn: "ಸಂದೇಶ ಕಳುಹಿಸಲು ವಿಫಲವಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.", en: "Failed to send message. Please try again." },
  footer_brand_desc: { kn: "ನಿಮ್ಮ ವಿಶ್ವಾಸಾರ್ಹ ಸಹಕಾರಿ ಬ್ಯಾಂಕ್. ಸಮುದಾಯದ ಆರ್ಥಿಕ ಪ್ರಗತಿಗಾಗಿ ಬದ್ಧ.", en: "Your trusted cooperative bank. Committed to the community's economic progress." },
  footer_address_heading: { kn: "ವಿಳಾಸ", en: "Address" },
  footer_quicklinks_heading: { kn: "ತ್ವರಿತ ಲಿಂಕ್", en: "Quick Links" },
  footer_hours_label: { kn: "ಕಾರ್ಯ ಸಮಯ", en: "Working Hours" },
  footer_copyright: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ಕ್ರೆಡಿಟ್ ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿ., ಹುಬ್ಬಳ್ಳಿ. ಎಲ್ಲ ಹಕ್ಕುಗಳು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.", en: "Karavali Karnataka Credit Souharda Sahakari Sangha Ni., Hubballi. All rights reserved." },
  nav_logo_line1: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ಕ್ರೆಡಿಟ್", en: "Karavali Karnataka Credit" },
  nav_logo_line2: { kn: "ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ", en: "Souharda Sahakari Sangha" },
  contact_city: { kn: "ಹುಬ್ಬಳ್ಳಿ", en: "Hubballi" },
  footer_brand_line1: { kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ ಕ್ರೆಡಿಟ್", en: "Karavali Karnataka Credit" },
  footer_brand_line2: { kn: "ಸೌಹಾರ್ದ ಸಹಕಾರಿ ಸಂಘ ನಿ.", en: "Souharda Sahakari Sangha Ni." },
} as const;
type TranslationKey = keyof typeof translations;

export default function App() {
  const { actor } = useActor();
  const [language, setLanguage] = useState<"kn" | "en">("kn");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const t = (key: TranslationKey) => translations[key][language];

  const navLinks = [
    { id: "home", label: translations.nav_home[language] },
    { id: "deposit", label: translations.nav_deposit[language] },
    { id: "loan", label: translations.nav_loan[language] },
    { id: "hours", label: translations.nav_hours[language] },
    { id: "contact", label: translations.nav_contact[language] },
  ];

  const depositSchemes = [
    {
      title: translations.fd_title[language], subtitle: "Fixed Deposit", icon: "🏦",
      rates: [{ period: translations.fd_6m[language], rate: "8.00%" }, { period: translations.fd_12m[language], rate: "9.00%" }, { period: translations.fd_24m[language], rate: "10.00%" }],
      note: translations.fd_note[language], highlight: "10.00%", highlightLabel: translations.deposit_max_interest[language], color: "from-navy to-navy-dark",
    },
    {
      title: translations.rd_title[language], subtitle: "Recurring Deposit", icon: "📈",
      rates: [{ period: translations.rd_12m[language], rate: "8.00%" }, { period: translations.rd_24m[language], rate: "9.00%" }, { period: translations.rd_36m[language], rate: "10.00%" }],
      note: null as string | null, highlight: "10.00%", highlightLabel: translations.rd_highlight_label[language], color: "from-maroon to-maroon-dark",
    },
    {
      title: translations.mid_title[language], subtitle: translations.mid_subtitle[language], icon: "💰",
      rates: [{ period: translations.mid_12m[language], rate: "8.00%" }, { period: translations.mid_24m[language], rate: "8.50%" }],
      note: null as string | null, highlight: "8.50%", highlightLabel: translations.mid_highlight_label[language], color: "from-navy-light to-navy",
    },
    {
      title: translations.double_title[language], subtitle: "Double Deposit Scheme", icon: "⭐",
      rates: [] as { period: string; rate: string }[], note: null as string | null,
      highlight: "2×", highlightLabel: translations.double_highlight_label[language],
      specialText: translations.double_special_text[language], color: "from-gold-dark to-maroon",
    },
  ];

  const loanCategories = [
    { title: translations.loan_cat1_title[language], icon: "🏠", color: "border-l-navy", loans: [translations.loan_cat1_l1[language], translations.loan_cat1_l2[language], translations.loan_cat1_l3[language], translations.loan_cat1_l4[language]] },
    { title: translations.loan_cat2_title[language], icon: "🚗", color: "border-l-gold-dark", loans: [translations.loan_cat2_l1[language], translations.loan_cat2_l2[language], translations.loan_cat2_l3[language], translations.loan_cat2_l4[language]] },
    { title: translations.loan_cat3_title[language], icon: "👤", color: "border-l-maroon", loans: [translations.loan_cat3_l1[language], translations.loan_cat3_l2[language], translations.loan_cat3_l3[language], translations.loan_cat3_l4[language]] },
    { title: translations.loan_cat4_title[language], icon: "🌾", color: "border-l-navy-light", loans: [translations.loan_cat4_l1[language], translations.loan_cat4_l2[language]] },
  ];

  const workingHours = [
    { period: translations.hours_morning[language], time: "9.00 - 10.30", icon: "🌅" },
    { period: translations.hours_afternoon[language], time: "1.30 - 3.00", icon: "☀️" },
    { period: translations.hours_evening[language], time: "6.00 - 7.30", icon: "🌆" },
  ];

  const stats = [
    { value: "10%", label: translations.stat_deposit_interest[language], icon: <TrendingUp className="w-5 h-5" /> },
    { value: "2×", label: translations.stat_double[language], icon: <Star className="w-5 h-5" /> },
    { value: "4+", label: translations.stat_deposit_schemes[language], icon: <Shield className="w-5 h-5" /> },
    { value: "10+", label: translations.stat_loan_schemes[language], icon: <Users className="w-5 h-5" /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "deposit", "loan", "hours", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) { setActiveSection(id); break; }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) { toast.error(t("form_validation_error")); return; }
    setSubmitStatus("loading");
    try {
      if (!actor) throw new Error("Actor not available");
      await actor.submitInquiry(name.trim(), phone.trim(), message.trim(), BigInt(Date.now()));
      setSubmitStatus("success"); setName(""); setPhone(""); setMessage("");
      toast.success(t("form_success_toast"));
    } catch {
      setSubmitStatus("error"); toast.error(t("form_error_toast"));
    }
  };

  const LanguageToggle = ({ className = "" }: { className?: string }) => (
    <button type="button" data-ocid="nav.language_toggle" onClick={() => setLanguage(language === "kn" ? "en" : "kn")}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/30 text-white/85 hover:border-gold hover:text-gold text-xs font-semibold transition-all duration-200 bg-white/5 hover:bg-white/10 ${className}`} aria-label="Switch language">
      <span className={language === "kn" ? "text-gold" : "text-white/50"}>ಕನ್ನಡ</span>
      <span className="text-white/30 mx-0.5">|</span>
      <span className={language === "en" ? "text-gold" : "text-white/50"}>EN</span>
    </button>
  );

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-background font-kannada">
      <Toaster richColors position="top-right" />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "nav-scrolled" : "bg-transparent"}`} aria-label="ಮುಖ್ಯ ನ್ಯಾವಿಗೇಷನ್">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <button type="button" onClick={() => scrollTo("home")} className="flex items-center gap-3 group">
              <img src="/assets/generated/bank-logo-transparent.dim_200x200.png" alt="ಸಂಘದ ಲೋಗೋ" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-gold" />
              <div className="hidden sm:block">
                <p className="text-white font-bold text-sm leading-tight kannada-heading max-w-[200px] truncate">{t("nav_logo_line1")}</p>
                <p className="text-gold text-xs leading-tight">{t("nav_logo_line2")}</p>
              </div>
            </button>
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button type="button" key={link.id} data-ocid={`nav.${link.id}_link`} onClick={() => scrollTo(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 kannada-heading ${activeSection === link.id ? "text-gold bg-white/10" : "text-white/80 hover:text-gold hover:bg-white/8"}`}>
                  {link.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <LanguageToggle />
              <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors" aria-label="ಮೆನು ತೆರೆಯಿರಿ">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }} className="md:hidden bg-navy-dark border-t border-white/10">
              <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button type="button" key={link.id} data-ocid={`nav.${link.id}_link`} onClick={() => scrollTo(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors kannada-heading ${activeSection === link.id ? "bg-gold text-navy-dark" : "text-white/85 hover:bg-white/10 hover:text-gold"}`}>
                    {link.label}
                  </button>
                ))}
                <div className="pt-2 pb-1 px-2"><LanguageToggle className="w-full justify-center" /></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/generated/hero-banner.dim_1400x600.jpg')" }} />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `repeating-linear-gradient(45deg, oklch(0.78 0.14 72) 0px, oklch(0.78 0.14 72) 1px, transparent 1px, transparent 50px)` }} />
        <div className="relative container mx-auto px-4 sm:px-6 py-24 sm:py-32">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-wrap gap-2 mb-6">
              <Badge className="bg-gold/20 text-gold border border-gold/40 text-xs px-3 py-1">GSTIN: 29AAPAK4058G127</Badge>
              <Badge className="bg-white/10 text-white/70 border border-white/20 text-xs px-3 py-1">DRZ/RSR/RGN/7093/2025-26</Badge>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white kannada-heading leading-tight mb-4">
              {t("hero_org_line1")}
              <span className="block gold-gradient-text mt-1">{t("hero_org_line2")}</span>
              <span className="text-xl sm:text-2xl text-white/80 font-semibold mt-2 block">{t("hero_city")}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }} className="text-lg sm:text-xl text-white/85 mb-8 leading-relaxed kannada-heading max-w-xl">
              {t("hero_tagline")}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row gap-4">
              <Button data-ocid="hero.primary_button" onClick={() => scrollTo("contact")} className="bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 text-base h-auto rounded-lg shadow-gold transition-all duration-200 hover:shadow-banking-lg hover:-translate-y-0.5 kannada-heading">
                {t("hero_cta_contact")}<ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => scrollTo("deposit")} variant="outline" className="border-white/40 text-white hover:bg-white/10 hover:text-gold hover:border-gold font-semibold px-8 py-4 text-base h-auto rounded-lg transition-all duration-200 kannada-heading">
                {t("hero_cta_deposit")}
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.55 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/20">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center gap-1">
                  <div className="text-gold mb-1">{stat.icon}</div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white gold-gradient-text">{stat.value}</span>
                  <span className="text-xs text-white/65 kannada-heading leading-tight">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>
      <section id="deposit" data-ocid="deposit.section" className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <Badge className="bg-gold/15 text-gold-dark border border-gold/30 mb-4 px-4 py-1.5 text-sm kannada-heading">{t("deposit_badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy kannada-heading mb-4">{t("deposit_heading")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto kannada-heading text-base sm:text-lg">{t("deposit_sub")}</p>
            <hr className="section-divider max-w-xs mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {depositSchemes.map((scheme, idx) => (
              <motion.div key={scheme.title} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className="card-banking overflow-hidden">
                <div className={`bg-gradient-to-r ${scheme.color} p-5 flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{scheme.icon}</span>
                    <div>
                      <h3 className="text-white font-bold text-lg kannada-heading">{scheme.title}</h3>
                      <p className="text-white/70 text-xs">{scheme.subtitle}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="interest-badge text-2xl">{scheme.highlight}</div>
                    <p className="text-white/65 text-xs mt-1 kannada-heading">{scheme.highlightLabel}</p>
                  </div>
                </div>
                <div className="p-5">
                  {scheme.rates.length > 0 ? (
                    <div className="space-y-3">
                      {scheme.rates.map((rate) => (
                        <div key={rate.period} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border hover:border-gold/40 transition-colors">
                          <span className="text-foreground/80 text-sm kannada-heading">{rate.period}</span>
                          <span className="text-2xl font-extrabold text-navy kannada-heading">{rate.rate}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-4xl font-extrabold gold-gradient-text mb-2 kannada-heading">{t("double_years_label")}</p>
                      <p className="text-foreground/80 text-base kannada-heading leading-relaxed">{"specialText" in scheme ? scheme.specialText : ""}</p>
                    </div>
                  )}
                  {scheme.note && (
                    <div className="mt-4 p-3 bg-gold/8 border border-gold/25 rounded-lg">
                      <p className="text-foreground/75 text-xs kannada-heading leading-relaxed flex gap-2"><Star className="w-4 h-4 text-gold shrink-0 mt-0.5" />{scheme.note}</p>
                    </div>
                  )}
                  <Button onClick={() => scrollTo("contact")} className="w-full mt-4 bg-navy hover:bg-navy-light text-white font-semibold kannada-heading h-10">
                    {t("deposit_more_info")}<ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="loan" data-ocid="loan.section" className="py-20 sm:py-28" style={{ background: "linear-gradient(180deg, oklch(0.22 0.065 260 / 0.04) 0%, oklch(0.97 0.005 250) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <Badge className="bg-navy/10 text-navy border border-navy/25 mb-4 px-4 py-1.5 text-sm kannada-heading">{t("loan_badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy kannada-heading mb-4">{t("loan_heading")}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto kannada-heading text-base sm:text-lg">{t("loan_sub")}</p>
            <hr className="section-divider max-w-xs mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {loanCategories.map((cat, idx) => (
              <motion.div key={cat.title} initial={{ opacity: 0, x: idx % 2 === 0 ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }} className={`card-banking p-6 border-l-4 ${cat.color} border-t-0`}>
                <div className="flex items-center gap-3 mb-4"><span className="text-3xl">{cat.icon}</span><h3 className="text-lg font-bold text-navy kannada-heading">{cat.title}</h3></div>
                <ul className="space-y-2.5">
                  {cat.loans.map((loan, lIdx) => (
                    <li key={loan} className="flex items-start gap-2.5 text-foreground/80 text-sm kannada-heading">
                      <div className="w-5 h-5 rounded-full bg-gold/15 border border-gold/35 flex items-center justify-center shrink-0 mt-0.5"><span className="text-gold text-xs font-bold">{lIdx + 1}</span></div>
                      {loan}
                    </li>
                  ))}
                </ul>
                <Separator className="my-4 bg-border/60" />
                <Button onClick={() => scrollTo("contact")} variant="outline" size="sm" className="w-full border-navy/30 text-navy hover:bg-navy hover:text-white transition-all kannada-heading font-medium">{t("loan_contact_btn")}</Button>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-10 rounded-2xl overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.22 0.065 260) 0%, oklch(0.32 0.12 15) 100%)" }}>
            <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white font-bold text-xl sm:text-2xl kannada-heading mb-2">{t("loan_cta_heading")}</h3>
                <p className="text-white/75 kannada-heading text-sm sm:text-base">{t("loan_cta_sub")}</p>
              </div>
              <Button onClick={() => scrollTo("contact")} className="bg-gold hover:bg-gold-light text-navy-dark font-bold px-8 py-4 text-base h-auto rounded-lg whitespace-nowrap shrink-0 kannada-heading shadow-gold">{t("loan_apply_btn")}</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="hours" className="py-20 sm:py-28 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <Badge className="bg-gold/15 text-gold-dark border border-gold/30 mb-4 px-4 py-1.5 text-sm kannada-heading">{t("hours_badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy kannada-heading mb-4">{t("hours_heading")}</h2>
            <p className="text-muted-foreground max-w-md mx-auto kannada-heading">{t("hours_sub")}</p>
            <hr className="section-divider max-w-xs mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {workingHours.map((wh, idx) => (
              <motion.div key={wh.period} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.15 }} className="card-banking p-8 text-center group">
                <div className="text-5xl mb-4">{wh.icon}</div>
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-navy/20 transition-colors"><Clock className="w-6 h-6 text-navy" /></div>
                <h3 className="font-bold text-navy text-xl kannada-heading mb-2">{wh.period}</h3>
                <p className="text-2xl font-extrabold gold-gradient-text kannada-heading">{wh.time}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }} className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-navy/8 border border-navy/20 rounded-full px-6 py-3">
              <Building2 className="w-4 h-4 text-navy" />
              <span className="text-navy font-medium text-sm kannada-heading">{t("hours_days")}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="py-20 sm:py-28" style={{ background: "linear-gradient(180deg, oklch(0.97 0.005 250) 0%, oklch(0.93 0.012 250) 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <Badge className="bg-maroon/10 text-maroon border border-maroon/25 mb-4 px-4 py-1.5 text-sm kannada-heading">{t("contact_badge")}</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy kannada-heading mb-4">{t("contact_heading")}</h2>
            <p className="text-muted-foreground max-w-md mx-auto kannada-heading">{t("contact_sub")}</p>
            <hr className="section-divider max-w-xs mx-auto mt-6" />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-6">
              <div className="rounded-2xl overflow-hidden shadow-banking" style={{ background: "linear-gradient(135deg, oklch(0.22 0.065 260) 0%, oklch(0.15 0.055 262) 100%)" }}>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <img src="/assets/generated/bank-logo-transparent.dim_200x200.png" alt="ಸಂಘದ ಲೋಗೋ" className="w-16 h-16 rounded-full object-cover ring-2 ring-gold" />
                    <div>
                      <h3 className="text-white font-bold text-base sm:text-lg kannada-heading leading-snug">{t("contact_org_name")}</h3>
                      <p className="text-gold text-sm kannada-heading">{t("contact_city")}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-gold" /></div>
                      <div><p className="text-white/50 text-xs mb-0.5">{t("contact_address_label")}</p><p className="text-white/90 text-sm kannada-heading leading-relaxed whitespace-pre-line">{t("contact_address")}</p></div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-gold" /></div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">{t("contact_phone_label")}</p>
                        <div className="space-y-1">
                          <a href="tel:6366982712" className="text-white/90 text-sm block hover:text-gold transition-colors">6366982712</a>
                          <a href="tel:9448273033" className="text-white/90 text-sm block hover:text-gold transition-colors">94482 73033</a>
                          <a href="tel:8050195141" className="text-white/90 text-sm block hover:text-gold transition-colors">80501 95141</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-gold" /></div>
                      <div>
                        <p className="text-white/50 text-xs mb-0.5">{t("contact_email_label")}</p>
                        <a href="mailto:karavalidkarnatakacreditsociety@gmail.com" className="text-white/90 text-xs sm:text-sm hover:text-gold transition-colors break-all">karavalidkarnatakacreditsociety@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-6 sm:px-8 py-4 bg-black/20 border-t border-white/10">
                  <div className="flex flex-wrap gap-4 text-xs text-white/50">
                    <span>GSTIN: <span className="text-white/70 font-mono">29AAPAK4058G127</span></span>
                    <span>RGN: <span className="text-white/70 font-mono">DRZ/RSR/RGN/7093/2025-26</span></span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="card-banking p-6 sm:p-8">
                <h3 className="text-xl font-bold text-navy kannada-heading mb-6 flex items-center gap-2"><Mail className="w-5 h-5 text-gold" />{t("form_heading")}</h3>
                <AnimatePresence mode="wait">
                  {submitStatus === "success" ? (
                    <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} data-ocid="contact.success_state" className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4"><CheckCircle2 className="w-9 h-9 text-green-600" /></div>
                      <h4 className="text-xl font-bold text-navy kannada-heading mb-2">{t("form_success_heading")}</h4>
                      <p className="text-muted-foreground kannada-heading mb-6">{t("form_success_body")}</p>
                      <Button onClick={() => setSubmitStatus("idle")} variant="outline" className="border-navy text-navy hover:bg-navy hover:text-white kannada-heading">{t("form_send_another")}</Button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-name" className="text-foreground font-medium kannada-heading">{t("form_name_label")} <span className="text-destructive">*</span></Label>
                        <Input id="contact-name" data-ocid="contact.name_input" type="text" placeholder={t("form_name_placeholder")} value={name} onChange={(e) => setName(e.target.value)} className="h-11 kannada-heading border-border focus:border-navy focus:ring-navy/30" required autoComplete="name" disabled={submitStatus === "loading"} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-phone" className="text-foreground font-medium kannada-heading">{t("form_phone_label")} <span className="text-destructive">*</span></Label>
                        <Input id="contact-phone" data-ocid="contact.phone_input" type="tel" placeholder={t("form_phone_placeholder")} value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 kannada-heading border-border focus:border-navy focus:ring-navy/30" required autoComplete="tel" disabled={submitStatus === "loading"} />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="contact-message" className="text-foreground font-medium kannada-heading">{t("form_message_label")} <span className="text-destructive">*</span></Label>
                        <Textarea id="contact-message" data-ocid="contact.textarea" placeholder={t("form_message_placeholder")} value={message} onChange={(e) => setMessage(e.target.value)} className="min-h-[120px] kannada-heading border-border focus:border-navy focus:ring-navy/30 resize-none" required disabled={submitStatus === "loading"} />
                      </div>
                      <AnimatePresence>
                        {submitStatus === "error" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} data-ocid="contact.error_state" className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm kannada-heading">
                            {t("form_error_body")}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <Button data-ocid="contact.submit_button" type="submit" disabled={submitStatus === "loading"} className="w-full bg-navy hover:bg-navy-light text-white font-bold h-12 text-base kannada-heading transition-all shadow-banking">
                        {submitStatus === "loading" ? (<><Loader2 data-ocid="contact.loading_state" className="mr-2 w-5 h-5 animate-spin" />{t("form_sending")}</>) : (<>{t("form_submit")}<ArrowRight className="ml-2 w-5 h-5" /></>)}
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="bg-navy-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <img src="/assets/generated/bank-logo-transparent.dim_200x200.png" alt="ಸಂಘದ ಲೋಗೋ" className="w-14 h-14 rounded-full object-cover ring-2 ring-gold" />
                <div><h4 className="font-bold text-base kannada-heading leading-snug">{t("footer_brand_line1")}</h4><p className="text-gold text-sm kannada-heading">{t("footer_brand_line2")}</p></div>
              </div>
              <p className="text-white/60 text-sm kannada-heading leading-relaxed mb-4">{t("footer_brand_desc")}</p>
              <div className="space-y-1 text-xs text-white/45">
                <p>GSTIN: <span className="font-mono text-white/60">29AAPAK4058G127</span></p>
                <p>RGN: <span className="font-mono text-white/60">DRZ/RSR/RGN/7093/2025-26</span></p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gold mb-4 kannada-heading text-sm uppercase tracking-wide">{t("footer_address_heading")}</h4>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3 text-white/75"><MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" /><p className="kannada-heading leading-relaxed whitespace-pre-line">{t("contact_address")}</p></div>
                <div className="flex gap-3 text-white/75"><Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" /><div className="kannada-heading space-y-0.5"><a href="tel:6366982712" className="block hover:text-gold transition-colors">6366982712</a><a href="tel:9448273033" className="block hover:text-gold transition-colors">94482 73033</a><a href="tel:8050195141" className="block hover:text-gold transition-colors">80501 95141</a></div></div>
                <div className="flex gap-3 text-white/75"><Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" /><a href="mailto:karavalidkarnatakacreditsociety@gmail.com" className="kannada-heading hover:text-gold transition-colors break-all text-xs">karavalidkarnatakacreditsociety@gmail.com</a></div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gold mb-4 kannada-heading text-sm uppercase tracking-wide">{t("footer_quicklinks_heading")}</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.id}><button type="button" onClick={() => scrollTo(link.id)} className="text-white/65 hover:text-gold text-sm kannada-heading transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3 text-gold" />{link.label}</button></li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-3"><Clock className="w-4 h-4 text-gold" /><p className="text-gold text-xs font-semibold kannada-heading uppercase tracking-wide">{t("footer_hours_label")}</p></div>
                {workingHours.map((wh) => (<p key={wh.period} className="text-white/60 text-xs kannada-heading mb-1">{wh.period}: <span className="text-white/80">{wh.time}</span></p>))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <p className="kannada-heading text-center sm:text-left">© {currentYear} {t("footer_copyright")}</p>
            <p className="text-center sm:text-right">Built with ❤️ using <a href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`} target="_blank" rel="noopener noreferrer" className="text-white/55 hover:text-gold transition-colors">caffeine.ai</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
