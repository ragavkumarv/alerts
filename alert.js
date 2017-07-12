const {reduce,curry,compose,trim,head,match,map,reduceBy,forEachObjIndexed} = R;

const log = console.log;
const headMatch = x => compose(head,match(x));
const resObj = (str) => ({incs:headMatch(/INC\d\s\w\d/)(str),gp:headMatch(/\b[a-z]/)(str)})
const inClean = compose(map(resObj),map(trim),match(/INC.+?(?=INC)|INC.+?(?=$)/g));
const reduceToIdBy = reduceBy((acc, alertGp) => [...acc,alertGp.incs], []);
const incsByGroup = reduceToIdBy((alertGp)=>alertGp.gp); 
const printKeyConcatValue = (value, key) => {log(key,'\n'); map(log)(value); log('\n')}

// const fun = () => {
  const InStr = `INC1 F1 c INC2 F2 b INC3 F3 b INC4 F4 e INC4 F4 c`;
// const Instr = document.getElementById("inc");
// const InClean = inClean(InStr);
// const IncsByGroup = incsByGroup(InClean);
  log('============START=============')
// forEachObjIndexed(printKeyConcatValue,IncsByGroup);
log('============END===============')
// }
// const InStr = `INC1 F1 c INC2 F2 b INC3 F3 b INC4 F4 e INC4 F4 c`;

class Inc extends React.Component{
  render(){
    const {gp,incs} = this.props;
    // log(IncsByGroup)
    console.log(incs);
      return(
        <div>
          <h2>{gp}</h2>
          <ul>
            {incs.map(inc =><li>{inc}</li>) }
          </ul>
        </div> 
      );
  }
}

class Home extends React.Component{
  constructor (){
      super();
      this.state = {
          alerts : {}
      };

      // bind addTodo once in constructor
      this.addTodo = this.addTodo.bind(this); 
  }

  // addTodo will receive the needed value without refs
  addTodo (alerts){
    console.log('reached',alerts)
          const InClean = inClean(alerts);
          const IncsByGroup = incsByGroup(InClean);
       this.setState({ alerts:IncsByGroup });
  }
  render(){
      return(<div>
       <InputForm onSubmit={this.addTodo}></InputForm>
        <IncList alerts={this.state.alerts} />
      </div>) 
  }
}


class IncList extends React.Component{
  render(){
    const alerts = this.props.alerts;
      return(
        <section id="hello-world">
            { Object.keys(alerts).map((keyName, keyIndex) => {
          
              return <Inc gp={keyName} incs={alerts[keyName]}/> ; })
           }
        </section>
      );
  }
}

class InputForm extends React.Component {
  constructor(props) {
    super(props);

    // bind onSubmit and onInput
    this.onSubmit = this.onSubmit.bind(this);
    this.onInput = this.onInput.bind(this);

    // init state
    this.state = {
      input: ''
    };
  }

  // input change handler
  onInput(e) {
    this.setState({
      input: e.target.value
    });
  }

  // submit handler
  onSubmit() {
    console.log('new',this.state.input);
    this.props.onSubmit(this.state.input);
  }

  render (){
    return (
      <div>
        <input
          // use value and onChange so it will be a controlled component
          value={ this.state.value }
          onChange={ this.onInput }
          type="text"
          placeholder="Type your text here" />
        <button onClick={this.onSubmit}>Add to list</button>
      </div>
    )
  }
}
// const numbers = {1:'raga',2:'2',4:'4'}

// const numbers = [1,2,3]
ReactDOM.render(<Home />, document.getElementById('app'))
// {map(inc => { return <Inc inc={inc}/> })(gps) }
