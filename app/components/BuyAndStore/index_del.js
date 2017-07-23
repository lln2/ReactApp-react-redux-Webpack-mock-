//app/BuyAndHandle/
class Buy extends React.Component{
	constructor(props , context){
		super(props , context)
		this.sgouldComponentUpdate = this.shouldComponentUpdate.bind(this)
		this.state = {
			isStore:false
		}
	}
	render(){
		return (
				 <BuyAndHandle isStore={this.state.store} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)} />
			)
	}
	componentDidmount(){
		this.checkStoreState()		 
	}
	checkStoreState(){
		const id = this.props.id
		const store = this.props.store;
		store.forEach(item=>{
				if(item.id == id){
					this.setState({
						isStore:true
					})
				}else{
					return false
				}


		})
	}
	isLogin(){
		const id = this.props.id;
		const userinfo = this.props.userinfo;
		if(!userinfo.username){
			hashHistory.push('/login/'+encodingURLComponent('detail/'+id));
			return false
		}
		return true
	}
	buyHandle(){
		const islogin = this.isLogin();
		if(!islogin){
			return
		}
		hashHistory.push('/User');


	}
	StoreHandle(){
		const islogin = this.isLogin();
		if(!islogin){
			return
		}
		const id = this.props.id;
		const Action = this.props.storeAction;
		const isStore = this.state.isStore;
		if(isStore){
			Action.rm({id:id})
		}else{
			Action.add({id:id})
		}
	}

	 
	 
	 



}
function mapStateToProps (state){
	return {
		 store:state.store,
		 userinfo:state.userinfo
	}
}
function mapDispatchToProps(dispatch){
	return {
		 storeAction:bindActionCreator(ActionFromOtherFiles , dispatch)
	}
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
	)(Buy)
//app/BuyAndHandle/
class BuyAndHandle extends React.Component{
	constructor(props , context){
		super(props , context)
		this.sgouldComponentUpdate = this.shouldComponentUpdate.bind(this)
		this.state = {
			isStore:false
		}
	}
	render(){
		return (
				<div>
					{

						this.state.isStore
						?<div  onClick={this.storeHandle.bind(this)}> 已收藏 </div>
						:<div onClick={this.storeHandle.bind(this)} > 收藏</div>
					}
					<div onCLick={this.buyHandle.bind(this)}></div>
				</div>
			)
	}
	 
	storeHandle(){
		const storeHandle = this.props.storeHandle();
		storeHandle();
	}
	BuyHandle(){
		 const buyHandle = this.porps.buyHandle;
		 buyHandle()
	}



}
 
export default  BuyAndHandle