function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    // Tabs

    const tabs = document.querySelectorAll(tabsSelector);
    const tabsContent = document.querySelectorAll(tabsContentSelector);
    const tabsParent = document.querySelector(tabsParentSelector);
  
    function hideTabContent() {
      tabsContent.forEach((el) => {
        el.classList.add('hide');
        el.classList.remove('show', 'fade');
      });
  
      tabs.forEach((el) => {
        el.classList.remove(activeClass);
      });
    }
  
    function showTabContent(ind = 0) {
      tabsContent[ind].classList.add('show', 'fade');
      tabsContent[ind].classList.remove('hide');
      tabs[ind].classList.add(activeClass);
    }
  
    hideTabContent();
    showTabContent();
  
    tabsParent.addEventListener('click', (event) => {
      const target = event.target;
  
      if(target && target.classList.contains(tabsSelector.slice(1))) {
        tabs.forEach((item, i)=>{
          if(target == item){
            hideTabContent();
            showTabContent(i);
          }
        })
      }
    })
  
}

export default tabs;