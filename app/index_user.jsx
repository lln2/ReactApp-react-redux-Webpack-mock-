class item extends React.Component{
		constructor(props , context){
			super(props , context)
			this.shouldComponentUpdate = PureRenderMixin>shouldComponentUpdate.bind(this)
			this.state = {
				commentState:0
				stars:{}

			}

		}
		render(){

			const data = this.props.data;
			return (
				<div>
					<div className="">
						<div>
							<img src={data.img}  />
						</div>
						<div>
							{
								this.state.commentState === 0
								?<button onClick={this.showComment.bind(this)}>评价</button>
								: this.satte.commentState === 1
									?""
									:<button>已评价</button>

							}
						</div>
						<div>
							<span>  {data.title}  </span>
							<span>  {data.count}  </span>
							<span>  {data.price}  </span>
						</div>

					</div>
				</div>
				{
					this.state.commentState === 1
					?
						<div>
							<textarea ref='commentText'></textarea>
							<star  star='0' clickCallBack={this.clickCallBack.bind(this)} />
							<button onClick={this.submitComment.bind(this)}>提交 </button>
							<button onClick={this.hideComment.bind(this)}> 取消 </button>
						</div>
					:""


				}
				)
		}
		componentDidMount(){
			this.setState({
				commentState:this.props.data.commentState
			})
		}
		showComment(){
			this.setState({
				commentState:1
			})
		}
		hideComment(){
			this.setState({
				commentState:0
			})
		}
		commentOK(){
			this.setState({
				commentState:2
			})
		}
		submitComment(){
			const submitComment = this.props.submitComment;
			const id = this.props.data.id;
			const value = this.ref.commentText.value.trim();
			const star = this.state.stars[id]||'0'
			submitComment(id , value , star , this.commentOK.bind(this))
		}
		startClickCallBack(star){
			let stars = this.state.stars;
			let id = this.props.data.id;
			stars[id] = star;
			this.setState({
				stars:stars
			})
		}
}

export default item

//app/components/star/index

class star extends React.Component{
		constructor(props , context){
			super(props , context)
			this.shouldComponentUpdate = PureRenderMixin>shouldComponentUpdate.bind(this)
			this.state = {
				 
				star:0

			}

		}
		render(){
			let star = this.state.star||0
			if(star>5){
				star = star%5
			}
				 		
			return (
				{
					[1,2,3,4,5].map((item, index)=>{

						const lightBox = star>=item?'lightBox':"";
						return <i key={index} className="ico {lightBox}" onClick={this.clickCallBack.bind(this , item)}></i>

					})

				}	 
					 
				)
		}
		componentDidMount(){
			this.setState({
				star:this.prop.star
			})
		}

		clickHandle(star){
			const clickCallBack = this.props.clickCallBack;
			if(!clickCallBack){
				return
			}
			this.setState({
				star:star
			})
			clickCallBack(star)

		}
	 
}

export default star
