export const store = {
  draft: {
    get: () => {
      try {
        return JSON.parse(localStorage.getItem("contact_draft") || "{}");
      } catch {
        return {};
      }
    },
    save: (data: any) => {
      localStorage.setItem("contact_draft", JSON.stringify(data));
    },
    clear: () => {
      localStorage.removeItem("contact_draft");
    }
  }
};
