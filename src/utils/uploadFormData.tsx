// utils/uploadFormData.js

const uploadFormData = async (formData: FormData) => {
  try {
    const response = await fetch("http://10.0.10.65:4563/api/v1/users/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload form data");
    }

    const data = await response.json();

    // Assuming the response contains a URL
    if (data && data?.data?.Location) {
      const url = data?.data?.Location;
      return url;
    } else {
      throw new Error("URL not found in response");
    }
  } catch (error) {
    console.error("Error uploading form data:", error);
    throw error; // rethrow to handle in calling function
  }
};

export default uploadFormData;
