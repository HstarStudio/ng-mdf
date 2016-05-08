((angular) => {
  class EventBus {
    constructor(){
      
    }
    
  }
  EventBus.$inject = [];
  angular.module('core')
    .service('hmEventBus', EventBus);
})(window.angular);