export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

export const scrollToPage = (pagePath: string) => {
  // If we're already on the page, scroll to top
  if (window.location.pathname === pagePath) {
    scrollToTop();
  } else {
    // Navigate to the page and scroll to top
    window.location.href = pagePath;
  }
};

export const scrollToPageSection = (pagePath: string, sectionId: string) => {
  // If we're already on the page, scroll to section
  if (window.location.pathname === pagePath) {
    scrollToSection(sectionId);
  } else {
    // Navigate to the page with section hash
    window.location.href = `${pagePath}#${sectionId}`;
  }
}; 