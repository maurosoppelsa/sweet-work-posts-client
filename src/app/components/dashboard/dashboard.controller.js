function DashboardController(PostAndAuthorService, $scope) {
    
    var self = this;
    this.isAuthorSelected;

    $scope.posts = [];
    $scope.currentPage;
    $scope.pageSize;
    $scope.totalPosts;
    $scope.authorPosts = [];

    function init() {
      this.isAuthorSelected = false;
      $scope.currentPage = 1;
      $scope.pageSize = 4;
      $scope.getpaginatedPosts($scope.currentPage, $scope.pageSize);
      getPostTotalCount();
      getAllAuthors();
    }

    this.numberOfPages = function (totalPosts, pageSize){
      return Math.ceil(totalPosts/pageSize);                
    }

     $scope.getpaginatedPosts = function (currentPage,size) {
      PostAndAuthorService.getPostsPagination(currentPage, size).then(function(resp){
        $scope.posts = [];
        if(resp.data){
          angular.forEach(resp.data,function(value,key){
            PostAndAuthorService.getAuthorById(value.auth_id).then(function(response){
              value.author = response.data;
            });
        });
        }
        $scope.posts = resp.data;
      });
    };


    this.getPostsByTitle = function (title) {
      PostAndAuthorService.getPostsByTitle(title).then(function(resp){;
        self.isAuthorSelected = true;
        $scope.authorPosts = resp.data;
      });
    };

    this.selectAuthor = function(id) {
      this.isAuthorSelected = true;
      getPostsByAuthor(id);
    };

    this.backToPaginatedtList = function() {
      this.isAuthorSelected = false;
    };

    function sendPostsData (posts) {
      $rootScope.$broadcast('author-posts', { posts: posts });
    }

     function getPostTotalCount() {
      PostAndAuthorService.getPostTotalCount().then(function(resp){
        $scope.totalPosts = resp.data.count;
      });
    }

    function getAllAuthors () {
      PostAndAuthorService.getAuthors().then(function(resp){
        $scope.authors = resp.data;
      });
    };
    
    function getPostsByAuthor (id) {
      PostAndAuthorService.getPostByAuthor(id).then(function(resp){
        $scope.authorPosts = resp.data;
      });
    }

    init();
  }

  DashboardController.$inject = ['PostAndAuthorService', '$scope'];
  
  angular 
    .module('dashboard')
    .controller('DashboardController', DashboardController);