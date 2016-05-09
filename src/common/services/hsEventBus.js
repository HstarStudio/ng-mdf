((angular) => {
  'use strict';
  
  class EventBus {
    constructor($rootScope) {
      this.$rootScope = $rootScope;
    }
    // 调用事件
    emit(eventName, data) {
      this.$rootScope.$emit(eventName, data);
    }

    //监听事件
    on(eventName, callback, scope) {
      let destoryFn = this.$rootScope.$on(eventName, callback);
      if(scope){
        scope.$on('$destory', destoryFn);
      }
    }
  }
  EventBus.$inject = ['$rootScope'];
  angular.module('common')
    .service('hmEventBus', EventBus);
})(window.angular);