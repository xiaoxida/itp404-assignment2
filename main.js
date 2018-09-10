$("#search").submit(function(event){
  event.preventDefault();
  $('.post').remove();
  $('.post-hr').remove();
  let html = `<div class="loader">Loading...</div>`

	$('#results').html(html);

  let postsTemplateString = document.getElementById('posts-template').innerHTML;
  let renderPosts = Handlebars.compile(postsTemplateString);

  Handlebars.registerHelper('format-number', function(number){
    return number.toLocaleString();
  });

  let input = document.getElementById("subreddit").value;

  let url = 'https://www.reddit.com/r/' + input + '.json';

  $.getJSON(url).then((posts) => {
    console.log(posts.data.children);
    let renderedPosts = renderPosts({
      posts: posts.data.children
    });
    $('#results').html('');
    $('body').append(renderedPosts);
  }, function() {
    console.error('an error occurred');
    let html = "<p>Oops! Something went wrong!</p>"
    $('#results').html(html);
  });
});
