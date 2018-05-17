Search = React.createClass({
    
    getInitialState() {
      return {
        searchingText: ''
      };
    },

    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});

        if (searchingText.length > 2) {
          this.props.onSearch(searchingText);
        }
      },
      //kod klaiwsza eneter to 13
      handleKeyUp: function(event) {
        if (event.keyCode === 13) {
          this.props.onSearch(this.state.searchingText);
        }
      },

    render: function() {
        var styles = {
            fontSize: '1.5em', 
            width: '90%', 
            maxWidth: '350px'
        };

        return <input
                 type="text"
                 onChange={this.handleChange}
                 onKeyUp={this.handleKeyUp} //nasłuchiwanie na wciśnięcie, a właściwie na 'odciśnięcie' klawisza enter
                 placeholder="Tutaj wpisz wyszukiwaną frazę"
                 style={styles}
                 value={this.state.searchTerm}
                />
      }
});

//value trzyma wartość stanu, a nie tego co wpisuje użytkownik