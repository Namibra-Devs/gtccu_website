import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  IdCard,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  FileText,
  Building,
  Users,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import Toast from "../layout/Toast";
import FileUpload from "../FileUpload";

// Account type configurations
const ACCOUNT_TYPES = {
  PERSONAL: {
    id: "personal",
    name: "Personal Account",
    icon: User,
    description: "For individual members",
    requirements: {
      documents: [
        "Two Passport Pictures",
        "Photo Copy of any Valid ID",
        "Photo Copy of utility bill receipt (ECG, GWCL)",
      ],
    },
  },
  CORPORATE: {
    id: "corporate",
    name: "Corporate Account",
    icon: Building,
    description: "For businesses and companies",
    requirements: {
      documents: [
        "Certificate of Incorporation",
        "Certificate to Commence Business",
        "Passport Pictures of all Directors",
        "ID copies of all Directors",
        "Company utility bill receipt",
        "Board resolution letter (for non-sole proprietors)",
      ],
    },
  },
  SOLIDARITY: {
    id: "solidarity",
    name: "Solidarity Account",
    icon: Users,
    description: "For groups and associations",
    requirements: {
      documents: [
        "Registration certificate (if available)",
        "Bye-laws (if available)",
        "Passport Pictures of executives",
        "ID copies of executives",
        "Utility bills of executives",
      ],
    },
  },
};

export default function OpenAccountPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAccountType, setSelectedAccountType] = useState("");
  const [formData, setFormData] = useState({
    // Account Type
    accountType: "",

    // Personal Information (for all account types)
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    idNumber: "",
    idType: "",
    maritalStatus: "",
    profession: "",

    // Address Information
    address: "",
    city: "",
    region: "",
    postalCode: "",
    placeOfBirth: "",
    homeTown: "",

    // Account Specific Information
    // Corporate
    companyName: "",
    companyType: "",
    liabilityType: "",
    registrationNumber: "",
    registrationDate: "",
    tinNumber: "",
    natureOfBusiness: "",
    statedEquity: "",
    currentNetWorth: "",
    directors: [],

    // Solidarity
    groupName: "",
    groupRegistrationStatus: "",
    formationDate: "",
    district: "",
    groupOrientation: "",
    groupActivity: "",
    groupGenderType: "",
    memberContribution: "",
    resourceMobilization: "",
    executives: [],

    // Account Preferences
    initialDeposit: "",
    referral: "",
    accountPurpose: "",
    beneficiaryList: [],
    accountAccess: "",

    // Uploaded files
    uploadedDocuments: [],
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
    duration: 5000,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayFieldChange = (fieldName, index, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].map((item, i) =>
        i === index ? { ...item, [key]: value } : item
      ),
    }));
  };

  const addArrayFieldItem = (fieldName, template) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: [...prev[fieldName], template],
    }));
  };

  const removeArrayFieldItem = (fieldName, index) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, i) => i !== index),
    }));
  };

  const handleFilesUpload = useCallback((acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: [...prev.uploadedDocuments, ...acceptedFiles],
    }));
  }, []);

  const removeUploadedFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      uploadedDocuments: prev.uploadedDocuments.filter((_, i) => i !== index),
    }));
  };

  const closeToast = () => {
    setToast({ ...toast, visible: false });
  };

  const selectAccountType = (type) => {
    setSelectedAccountType(type);
    setFormData((prev) => ({ ...prev, accountType: type }));
  };

  const nextStep = () => {
    // Validation based on current step
    if (currentStep === 1 && !selectedAccountType) {
      setToast({
        visible: true,
        message: "Please select an account type",
        type: "error",
        duration: 4000,
      });
      return;
    }

    if (currentStep === 2) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dob",
        "idNumber",
        "idType",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        setToast({
          visible: true,
          message: "Please fill in all required personal information",
          type: "error",
          duration: 4000,
        });
        return;
      }
    }

    if (
      currentStep === 3 &&
      (!formData.address || !formData.city || !formData.region)
    ) {
      setToast({
        visible: true,
        message: "Please fill in all required address information",
        type: "error",
        duration: 4000,
      });
      return;
    }

    // Account-specific validation (step 4)
    if (currentStep === 4) {
      let isValid = true;
      let errorMessage = "";

      switch (selectedAccountType) {
        case "corporate":
          if (
            !formData.companyName ||
            !formData.companyType ||
            !formData.registrationNumber
          ) {
            isValid = false;
            errorMessage = "Please fill in all required company information";
          }
          break;
        case "solidarity":
          if (!formData.groupName) {
            isValid = false;
            errorMessage = "Please fill in all required group information";
          }
          break;
        default: // personal
          if (!formData.accountPurpose || !formData.initialDeposit) {
            isValid = false;
            errorMessage = "Please fill in all required account preferences";
          }
          break;
      }

      if (!isValid) {
        setToast({
          visible: true,
          message: errorMessage,
          type: "error",
          duration: 4000,
        });
        return;
      }
    }

    // Document upload validation (step 5)
    if (currentStep === 5 && formData.uploadedDocuments.length === 0) {
      setToast({
        visible: true,
        message: "Please upload required documents",
        type: "error",
        duration: 4000,
      });
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final validation
    if (!formData.accountType || !formData.initialDeposit) {
      setToast({
        visible: true,
        message: "Please complete all required fields",
        type: "error",
        duration: 4000,
      });
      return;
    }

    // Handle form submission
    console.log("Account application submitted:", formData);

    // Show success toast
    setToast({
      visible: true,
      message:
        "Application submitted successfully! We'll contact you within 24 hours.",
      type: "success",
      duration: 6000,
    });

    // Reset form and go back to first step after a delay
    setTimeout(() => {
      setFormData({
        accountType: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dob: "",
        idNumber: "",
        idType: "",
        maritalStatus: "",
        profession: "",
        address: "",
        city: "",
        region: "",
        postalCode: "",
        placeOfBirth: "",
        homeTown: "",
        companyName: "",
        companyType: "",
        liabilityType: "",
        registrationNumber: "",
        registrationDate: "",
        tinNumber: "",
        natureOfBusiness: "",
        statedEquity: "",
        currentNetWorth: "",
        directors: [],
        groupName: "",
        groupRegistrationStatus: "",
        formationDate: "",
        district: "",
        groupOrientation: "",
        groupActivity: "",
        groupGenderType: "",
        memberContribution: "",
        resourceMobilization: "",
        executives: [],
        initialDeposit: "",
        referral: "",
        accountPurpose: "",
        beneficiaryList: [],
        accountAccess: "",
        uploadedDocuments: [],
      });
      setSelectedAccountType("");
      setCurrentStep(1); // Go back to account type selection
    }, 2000); // Wait 2 seconds before resetting
  };
  const renderAccountTypeSelection = () => (
    <div className="text-center">
      <div className="flex items-center justify-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <UserCheck className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-xl font-bold text-blue-900 md:text-2xl">
          Select Account Type
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {Object.values(ACCOUNT_TYPES).map((account) => {
          const IconComponent = account.icon;
          return (
            <motion.div
              key={account.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                selectedAccountType === account.id
                  ? "border-blue-900 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
              onClick={() => selectAccountType(account.id)}
            >
              <div className="flex flex-col items-center">
                <IconComponent className="w-12 h-12 text-blue-900 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{account.name}</h3>
                <p className="text-gray-600 text-sm text-center">
                  {account.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {selectedAccountType && (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            Required Documents:
          </h4>
          <ul className="text-sm text-blue-800">
            {ACCOUNT_TYPES[
              selectedAccountType.toUpperCase()
            ].requirements.documents.map((doc, index) => (
              <li key={index}>• {doc}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-center md:justify-end">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          disabled={!selectedAccountType}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <User className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Birth *
          </label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="idType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ID Type *
          </label>
          <select
            id="idType"
            name="idType"
            value={formData.idType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select ID Type</option>
            <option value="voters">Voters ID</option>
            <option value="nhis">NHIS Card</option>
            <option value="drivers">Drivers Licence</option>
            <option value="passport">Passport</option>
            <option value="ssnit">SSNIT</option>
            <option value="nic">NIC</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="idNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            ID Number *
          </label>
          <div className="relative">
            <IdCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              value={formData.idNumber}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="maritalStatus"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Marital Status
          </label>
          <select
            id="maritalStatus"
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Status</option>
            <option value="married">Married</option>
            <option value="single">Single</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="profession"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Profession
        </label>
        <input
          type="text"
          id="profession"
          name="profession"
          value={formData.profession}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          placeholder="Enter your profession"
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderAddressInfo = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <MapPin className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">
          Address Information
        </h2>
      </div>

      <div className="mb-6">
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Street Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            City *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="region"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Region *
          </label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Region</option>
            <option value="ashanti">Ashanti Region</option>
            <option value="greater-accra">Greater Accra Region</option>
            <option value="eastern">Eastern Region</option>
            <option value="western">Western Region</option>
            <option value="northern">Northern Region</option>
            <option value="upper-east">Upper East Region</option>
            <option value="upper-west">Upper West Region</option>
            <option value="volta">Volta Region</option>
            <option value="central">Central Region</option>
            <option value="bono-east">Bono East Region</option>
            <option value="ahafo">Ahafo Region</option>
            <option value="savannah">Savannah Region</option>
            <option value="north-east">North East Region</option>
            <option value="oti">Oti Region</option>
            <option value="western-north">Western North Region</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="postalCode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="placeOfBirth"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Place of Birth
          </label>
          <input
            type="text"
            id="placeOfBirth"
            name="placeOfBirth"
            value={formData.placeOfBirth}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="homeTown"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Home Town
        </label>
        <input
          type="text"
          id="homeTown"
          name="homeTown"
          value={formData.homeTown}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderAccountSpecificInfo = () => {
    switch (selectedAccountType) {
      case "corporate":
        return renderCorporateInfo();
      case "solidarity":
        return renderSolidarityInfo();
      default:
        return renderPersonalAccountInfo();
    }
  };

  const renderCorporateInfo = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Building className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">
          Company Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Company Name *
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="companyType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Type of Company *
          </label>
          <select
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Company Type</option>
            <option value="sole-proprietorship">Sole Proprietorship</option>
            <option value="private">Private Company</option>
            <option value="public">Public Company</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="liabilityType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Type of Liability *
          </label>
          <select
            id="liabilityType"
            name="liabilityType"
            value={formData.liabilityType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Liability Type</option>
            <option value="limited-shares">Limited by Shares</option>
            <option value="unlimited">Unlimited</option>
            <option value="limited-guarantee">Limited by Guarantee</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="registrationNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Registration Number *
          </label>
          <input
            type="text"
            id="registrationNumber"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="registrationDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Registration *
          </label>
          <input
            type="date"
            id="registrationDate"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="tinNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            TIN Number *
          </label>
          <input
            type="text"
            id="tinNumber"
            name="tinNumber"
            value={formData.tinNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="natureOfBusiness"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nature of Business *
          </label>
          <select
            id="natureOfBusiness"
            name="natureOfBusiness"
            value={formData.natureOfBusiness}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Nature</option>
            <option value="trade">Trade</option>
            <option value="services">Services</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="statedEquity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Stated Equity
          </label>
          <input
            type="number"
            id="statedEquity"
            name="statedEquity"
            value={formData.statedEquity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="currentNetWorth"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Current Net Worth
        </label>
        <input
          type="number"
          id="currentNetWorth"
          name="currentNetWorth"
          value={formData.currentNetWorth}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Account Preferences for Corporate */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Account Preferences</h3>

        <div className="mb-6">
          <label
            htmlFor="initialDeposit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Initial Deposit Amount (GHS) *
          </label>
          <input
            type="number"
            id="initialDeposit"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
            required
            min="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="accountAccess"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Account Access *
          </label>
          <select
            id="accountAccess"
            name="accountAccess"
            value={formData.accountAccess}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Access Type</option>
            <option value="principal-only">
              Access Limited to Principal Only
            </option>
            <option value="joint-access">Joint Access</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="referral"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            How did you hear about us?
          </label>
          <select
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select an option</option>
            <option value="friend">Friend or Family</option>
            <option value="social-media">Social Media</option>
            <option value="search-engine">Search Engine</option>
            <option value="advertisement">Advertisement</option>
            <option value="school">School/Workplace</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Directors Information</h3>
        {formData.directors.map((director, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Director Name *
                </label>
                <input
                  type="text"
                  value={director.name}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "directors",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shares Owned
                </label>
                <input
                  type="number"
                  value={director.shares}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "directors",
                      index,
                      "shares",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeArrayFieldItem("directors", index)}
              className="text-red-600 text-sm hover:text-red-800"
            >
              Remove Director
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayFieldItem("directors", { name: "", shares: "" })
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Another Director
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderSolidarityInfo = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">Group Information</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="groupName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Group Name *
          </label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="groupRegistrationStatus"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Registration Status
          </label>
          <select
            id="groupRegistrationStatus"
            name="groupRegistrationStatus"
            value={formData.groupRegistrationStatus}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Status</option>
            <option value="registered">Registered</option>
            <option value="unregistered">Unregistered</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="formationDate"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date of Formation
          </label>
          <input
            type="date"
            id="formationDate"
            name="formationDate"
            value={formData.formationDate}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label
            htmlFor="district"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            District
          </label>
          <input
            type="text"
            id="district"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="groupOrientation"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Group Orientation
          </label>
          <select
            id="groupOrientation"
            name="groupOrientation"
            value={formData.groupOrientation}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Orientation</option>
            <option value="welfare">Welfare</option>
            <option value="trade">Trade</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="groupActivity"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Group Activity
          </label>
          <input
            type="text"
            id="groupActivity"
            name="groupActivity"
            value={formData.groupActivity}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <label
            htmlFor="groupGenderType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Group Gender Type
          </label>
          <select
            id="groupGenderType"
            name="groupGenderType"
            value={formData.groupGenderType}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Type</option>
            <option value="heterogeneous">Heterogeneous</option>
            <option value="homogeneous">Homogeneous</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="memberContribution"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Member Contribution
          </label>
          <input
            type="text"
            id="memberContribution"
            name="memberContribution"
            value={formData.memberContribution}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="resourceMobilization"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Resource Mobilization
        </label>
        <input
          type="text"
          id="resourceMobilization"
          name="resourceMobilization"
          value={formData.resourceMobilization}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      {/* Account Preferences for Corporate */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Account Preferences</h3>

        <div className="mb-6">
          <label
            htmlFor="initialDeposit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Initial Deposit Amount (GHS) *
          </label>
          <input
            type="number"
            id="initialDeposit"
            name="initialDeposit"
            value={formData.initialDeposit}
            onChange={handleChange}
            required
            min="10"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="accountAccess"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Account Access *
          </label>
          <select
            id="accountAccess"
            name="accountAccess"
            value={formData.accountAccess}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select Access Type</option>
            <option value="principal-only">
              Access Limited to Principal Only
            </option>
            <option value="joint-access">Joint Access</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="referral"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            How did you hear about us?
          </label>
          <select
            id="referral"
            name="referral"
            value={formData.referral}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="">Select an option</option>
            <option value="friend">Friend or Family</option>
            <option value="social-media">Social Media</option>
            <option value="search-engine">Search Engine</option>
            <option value="advertisement">Advertisement</option>
            <option value="school">School/Workplace</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Executives Information</h3>
        {formData.executives.map((executive, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Executive Name *
                </label>
                <input
                  type="text"
                  value={executive.name}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "executives",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  value={executive.contact}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "executives",
                      index,
                      "contact",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeArrayFieldItem("executives", index)}
              className="text-red-600 text-sm hover:text-red-800"
            >
              Remove Executive
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayFieldItem("executives", { name: "", contact: "" })
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Another Executive
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderPersonalAccountInfo = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <User className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">
          Account Preferences
        </h2>
      </div>

      <div className="mb-6">
        <label
          htmlFor="accountPurpose"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Account Purpose *
        </label>
        <select
          id="accountPurpose"
          name="accountPurpose"
          value={formData.accountPurpose}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Select Purpose</option>
          <option value="business">Business</option>
          <option value="private-savings">Private Savings</option>
          <option value="opening-savings">Opening Savings</option>
          <option value="shares">Shares</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="initialDeposit"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Initial Deposit Amount (GHS) *
        </label>
        <input
          type="number"
          id="initialDeposit"
          name="initialDeposit"
          value={formData.initialDeposit}
          onChange={handleChange}
          required
          min="10"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="accountAccess"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Account Access *
        </label>
        <select
          id="accountAccess"
          name="accountAccess"
          value={formData.accountAccess}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Select Access Type</option>
          <option value="principal-only">
            Access Limited to Principal Only
          </option>
          <option value="joint-access">Joint Access</option>
        </select>
      </div>

      <div className="mb-6">
        <label
          htmlFor="referral"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          How did you hear about us?
        </label>
        <select
          id="referral"
          name="referral"
          value={formData.referral}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        >
          <option value="">Select an option</option>
          <option value="friend">Friend or Family</option>
          <option value="social-media">Social Media</option>
          <option value="search-engine">Search Engine</option>
          <option value="advertisement">Advertisement</option>
          <option value="school">School/Workplace</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">Beneficiary Information</h3>
        {formData.beneficiaryList.map((beneficiary, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={beneficiary.name}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "beneficiaryList",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship *
                </label>
                <input
                  type="text"
                  value={beneficiary.relationship}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "beneficiaryList",
                      index,
                      "relationship",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact
                </label>
                <input
                  type="text"
                  value={beneficiary.contact}
                  onChange={(e) =>
                    handleArrayFieldChange(
                      "beneficiaryList",
                      index,
                      "contact",
                      e.target.value
                    )
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeArrayFieldItem("beneficiaryList", index)}
              className="text-red-600 text-sm hover:text-red-800"
            >
              Remove Beneficiary
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            addArrayFieldItem("beneficiaryList", {
              name: "",
              relationship: "",
              contact: "",
            })
          }
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          + Add Beneficiary
        </button>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );

  const renderDocumentUpload = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <Upload className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">Document Upload</h2>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-4">Required Documents:</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          {ACCOUNT_TYPES[
            selectedAccountType.toUpperCase()
          ].requirements.documents.map((doc, index) => (
            <li key={index} className="mb-1">
              {doc}
            </li>
          ))}
        </ul>
      </div>

      <FileUpload onFilesUpload={handleFilesUpload} />

      {formData.uploadedDocuments.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-3">Uploaded Files:</h4>
          <div className="space-y-2">
            {formData.uploadedDocuments.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <button
                  onClick={() => removeUploadedFile(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={nextStep}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Continue to Review
          <ArrowRight className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );
  const renderSummary = () => (
    <div>
      <div className="flex items-center mb-8">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <CheckCircle className="w-8 h-8 text-blue-900" />
        </div>
        <h2 className="text-2xl font-bold text-blue-900">Review Application</h2>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">Account Type</h3>
        <p className="text-gray-700">
          {ACCOUNT_TYPES[selectedAccountType.toUpperCase()].name}
        </p>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">Personal Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">First Name</p>
            <p className="font-medium">{formData.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Last Name</p>
            <p className="font-medium">{formData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{formData.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Phone</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Date of Birth</p>
            <p className="font-medium">{formData.dob}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">ID Type</p>
            <p className="font-medium">{formData.idType}</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">Address Information</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Address</p>
            <p className="font-medium">{formData.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">City</p>
            <p className="font-medium">{formData.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Region</p>
            <p className="font-medium">{formData.region}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Postal Code</p>
            <p className="font-medium">{formData.postalCode}</p>
          </div>
        </div>
      </div>

      {selectedAccountType === "corporate" && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-4">Company Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Company Name</p>
              <p className="font-medium">{formData.companyName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Company Type</p>
              <p className="font-medium">{formData.companyType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration Number</p>
              <p className="font-medium">{formData.registrationNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">TIN Number</p>
              <p className="font-medium">{formData.tinNumber}</p>
            </div>
          </div>
        </div>
      )}

      {selectedAccountType === "solidarity" && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold text-lg mb-4">Group Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Group Name</p>
              <p className="font-medium">{formData.groupName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration Status</p>
              <p className="font-medium">{formData.groupRegistrationStatus}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Group Orientation</p>
              <p className="font-medium">{formData.groupOrientation}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Group Activity</p>
              <p className="font-medium">{formData.groupActivity}</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">Account Preferences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {selectedAccountType === "personal" && (
            <div>
              <p className="text-sm text-gray-600">Account Purpose</p>
              <p className="font-medium">{formData.accountPurpose}</p>
            </div>
          )}
          <div>
            <p className="text-sm text-gray-600">Initial Deposit</p>
            <p className="font-medium">GHS {formData.initialDeposit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Account Access</p>
            <p className="font-medium">{formData.accountAccess}</p>
          </div>
          {formData.referral && (
            <div>
              <p className="text-sm text-gray-600">Referral Source</p>
              <p className="font-medium">{formData.referral}</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="font-semibold text-lg mb-4">Uploaded Documents</h3>
        {formData.uploadedDocuments.length > 0 ? (
          <ul className="space-y-2">
            {formData.uploadedDocuments.map((file, index) => (
              <li key={index} className="flex items-center">
                <FileText className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">{file.name}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No documents uploaded</p>
        )}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="text-gray-600 font-medium py-3 px-6 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
        >
          Back
        </button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all flex items-center"
        >
          Submit Application
          <CheckCircle className="w-5 h-5 ml-2" />
        </motion.button>
      </div>
    </div>
  );
  const renderSuccess = () => (
    <div className="text-center py-10">
      <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Application Submitted!
      </h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Thank you for applying to open an account with Global Teachers Credit
        Union. We'll review your application and contact you within 24 hours.
      </p>
      <div className="bg-green-50 p-4 rounded-lg border border-green-100 max-w-md mx-auto">
        <h3 className="font-semibold text-green-800 mb-2">Next Steps</h3>
        <ul className="text-left text-green-700 space-y-1">
          <li>• We'll verify your information</li>
          <li>• You'll receive a welcome email</li>
          <li>• Our team will guide you through the final steps</li>
        </ul>
      </div>
      <Link
        to="/"
        className="inline-block mt-8 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all"
      >
        Done
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Toast toast={toast} onClose={closeToast} />

      {/* Hero Section */}
      <div className="relative h-96 bg-black overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: "url('/images/about3.jpeg')" }}
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-white max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Open an Account
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Join thousands of educators who trust us with their financial
              journey. Start building your future today.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8 -mt-16 relative z-20">
        <div className="flex justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <div key={step} className="relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step
                    ? "bg-blue-900 text-white"
                    : "bg-white text-gray-400 border-2 border-gray-300"
                }`}
              >
                {currentStep > step ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-semibold">{step}</span>
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-xs hidden md:block font-medium whitespace-nowrap">
                {step === 1 && "Account Type"}
                {step === 2 && "Personal Info"}
                {step === 3 && "Address"}
                {step === 4 && "Account Details"}
                {step === 5 && "Documents"}
                {step === 6 && "Complete"}
              </div>
            </div>
          ))}
        </div>

        {/* Form Container */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
        >
          {currentStep === 1 && renderAccountTypeSelection()}
          {currentStep === 2 && renderPersonalInfo()}
          {currentStep === 3 && renderAddressInfo()}
          {currentStep === 4 && renderAccountSpecificInfo()}
          {currentStep === 5 && renderDocumentUpload()}
          {currentStep === 6 && renderSummary()}
          {currentStep === 7 && renderSuccess()}
        </motion.div>
      </div>
    </div>
  );
}
