// import React, {useState} from 'react'

// const Filter = (props) => {

//     const [start_date, setStartDate] = useState('')
//     const [end_date, setEndDate] = useState('')

//     const FilterHandle = (event) => {
//         event.preventDefault();
//         props.FilterDate(start_date, end_date);
//     };

//     const handleExport = (event) => {
//         event.preventDefault();
//         props.Export();
//     };

//   return (
//     <div>
//         <form className="form-inline" >
              
//               <div className="form-group">
//                 <label htmlFor="date">Start Date:</label>
//                 <input type="date"  className='form-control' value={start_date} onChange={e => setStartDate(e.target.value)} />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="date">End Date:</label>
//                 <input type="date" className='form-control' value={end_date} onChange={e => setEndDate(e.target.value)}/>
//               </div>
             
//               <button className='btn btn-default' onClick={FilterHandle}>Filter</button>
//               <button 
//                 className="btn btn-primary" onClick={handleExport}>
//                 Export
//               </button>
//             </form>
//     </div>
//   )
// }

// export default Filter


import React, { Component } from 'react'

export default class Filter extends Component {

  constructor(props) {
    
    super(props);
    this.state= {
      start_date: '', 
      end_date: ''
    };
  }

//   handleChange (e) {
//     this.setState({[e.target.name]: e.target.value});
//   }

  FilterHandle = (e) => {
      e.preventDefault();
    //   console.log(this.props);    
      this.props.FilterDate(this.state.start_date, this.state.end_date);
  }


  render() {
    return (
      <div className='filter-div'>
         <form className="form-inline" >
              
          <div className="form-group">
            <label htmlFor="date">Start Date:</label>
            <input type="date"  className='form-control' name="start_date" value={this.state.start_date} onChange={(e) => this.setState({ start_date: e.target.value }) } />
          </div>
          <div className="form-group">
            <label htmlFor="date">End Date:</label>
            <input type="date" className='form-control' name="end_date" value={this.state.end_date} onChange={(e) => this.setState({ end_date: e.target.value }) } />
          </div>
        
          <button className='btn btn-default' onClick={this.FilterHandle}>Filter</button>
         
        </form>
      </div>
    )
  }
}
