const GIPHY_API_URL = 'https://api.giphy.com/v1';
const GIPHY_PUB_KEY = 'C4olaemI48CryADWF3bnJYmsQuEzuLGB';

App = React.createClass({
    
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },    

/*    getGif: function(searchingText, callback) {  // 1.
        var url = GIPHY_API_URL + '/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  // 2.
        var xhr = new XMLHttpRequest();  // 3.
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
               var data = JSON.parse(xhr.responseText).data; // 4.
                var gif = {  // 5.
                    url: data.fixed_width_downsampled_url,
                    sourceUrl: data.url
                };
                callback(gif);  // 6.
            }
        };
        xhr.send();
    },*/    

    getGif: function(searchingText) {
        return new Promise(
            function (resolve, reject){
                const url = GIPHY_API_URL + '/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
                const xhr = new XMLHttpRequest();
                xhr.onload = function (){
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText).data;
                        const gif = { 
                            url: data.fixed_width_downsampled_url,
                            sourceUrl: data.url
                        }
                        resolve(gif);  
                    } else {
                        reject(Error(this.statusText)); 
                    }
                };
                xhr.onerror = function (){
                    reject(Error(
                        `XMLHttpRequest Error: ${this.statusText}`));
                };
                xhr.open('GET', url);
                xhr.send();
            }
        );
    },
    handleSearch: function(searchingText) { 
        this.setState({
          loading: true  
        });
        this.getGif(searchingText)
            .then(function (gif) {  //then ->spełniony
                this.setState({ 
                    loading: false,  
                    gif: gif,  
                    searchingText: searchingText  
                });
            }.bind(this)) //bind?? ->Ręczna zmiana kontekstu za pomocą metody bind
            .catch(function (error) { //catch-> niespełniony
                console.log(error);
            }).bind(this);        
    },
    render: function() {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
            </div>
        );
    },    
});