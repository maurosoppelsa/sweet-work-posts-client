function PostAndAuthorService(ConfigService,$http,$q) {
    this.env = ConfigService.apiUrl;    
    var self = this;

    this.getPostsPagination = function(page,size) {
        var deferred = $q.defer();
        $http({
            method: 'GET',
            url: this.env+'/post/page/'+page+'/'+size,
         }).then(function(resp){
            if(resp){
               deferred.resolve(resp); 
            }
         });

         return deferred.promise;
    }  


  this.getPostTotalCount = function() {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: this.env+'/post/count',
     }).then(function(resp){
         if(resp){
            deferred.resolve(resp);
         }
     });
     return deferred.promise;
  };

  this.getAuthorById = function(id) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: this.env+'/author/'+id,
     }).then(function(resp){
         if(resp){
            deferred.resolve(resp);
         }
     }).catch(function (err) {});
     return deferred.promise;
  };

  this.getAuthors = function() {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: this.env+'/author',
     }).then(function(resp){
         if(resp){
            deferred.resolve(resp);
         }
     }).catch(function (err) {});
     return deferred.promise;
  };

  this.getPostByAuthor = function(id) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: this.env+'/post/author/'+id,
     }).then(function(resp){
         if(resp){
            deferred.resolve(resp);
         }
     }).catch(function (err) {
         console.log(err);
         deferred.resolve({});
     });
     return deferred.promise;
  };

  this.getPostsByTitle = function(title) {
    var deferred = $q.defer();
    $http({
        method: 'GET',
        url: this.env+'/post/title/'+title,
     }).then(function(resp){
         if(resp){
            deferred.resolve(resp);
         }
     }).catch(function (err) {
         console.log(err);
         deferred.resolve({});
     });
     return deferred.promise;
  };
}


  angular
    .module('dashboard')
    .service('PostAndAuthorService', PostAndAuthorService);

    PostAndAuthorService.$inject = ["ConfigService", "$http", "$q"];