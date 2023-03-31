import React, { Component } from "react";
import {
  Container,
  Header,
  Segment,
  Button,
  Icon,
  Dimmer,
  Loader,
  Divider,
} from "semantic-ui-react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getDrinks();
  }

  getDrinks = async () => {
    try {
      const res = await fetch("/api/drinks");
      if (!res.ok) throw new Error(res.statusText ?? "some error");
      const drinks = await res.json();
      this.setState({ drinks });
      const res2 = await fetch(`/api/drinks/${drinks[0]?.id}`);
      if (!res2.ok)
        throw new Error(res2.statusText ?? "some drink fetch error");
      const drink = await res2.json();
      this.setState({ drink });
    } catch (error) {
      console.log(error);
    }
  };

  getDrink = async id => {
    try {
      const res = await fetch(`/api/drinks/${id}`);
      if (!res.ok) throw new Error(res.statusText ?? "some drink fetch error");
      const drink = await res.json();
      this.setState({ drink });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let { drinks, drink } = this.state;
    return drinks ? (
      <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>List of Ingredients</Header.Content>
        </Header>
        <Divider hidden section />
        {drinks && drinks.length ? (
          <Button.Group color='teal' fluid widths={drinks.length}>
            {Object.keys(drinks).map(key => {
              return (
                <Button
                  active={drink && drink.id === drinks[key].id}
                  fluid
                  key={key}
                  onClick={() => this.getDrink(drinks[key].id)}
                >
                  {drinks[key].title}
                </Button>
              );
            })}
          </Button.Group>
        ) : (
          <Container textAlign='center'>No drinks found.</Container>
        )}
        <Divider section />
        {drink && (
          <Container>
            <Header as='h2'>{drink.title}</Header>
            {drink.description && <p>{drink.description}</p>}
            {drink.ingredients && (
              <Segment.Group>
                {drink.ingredients.map((ingredient, i) => (
                  <Segment key={i}>{ingredient.description}</Segment>
                ))}
              </Segment.Group>
            )}
            {drink.steps && <p>{drink.steps}</p>}
            {drink.source && (
              <Button basic size='tiny' color='teal' href={drink.source}>
                Source
              </Button>
            )}
          </Container>
        )}
      </Container>
    ) : (
      <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
    );
  }
}

export default App;
