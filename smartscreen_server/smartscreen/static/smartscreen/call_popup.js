class CallPopup{
  constructor(screen_id){
    this.screen_id = screen_id;
    this.window = null;
  }
  open(){
    const call_window = window.open(`/receptionist_screen/${this.screen_id}`, "_blank", "toolbar=no,scrollbars=no,resizable=yes,menubar=no,titlebar=no,location=no,status=no");
    this.window = call_window;
    return call_window;
  }
  close(){
    this.window.close();
  }
  is_opened(){
    return this.window === null || !this.window.closed 
  }
}
class CallPopupManager{
  constructor(){
    this.popup = null;
  }
  newPopup(screen_id){
    if (this.popup!==null && this.popup.is_opened()){
      throw new Error("There is an existing popup");
    }
    this.popup = new CallPopup(screen_id);
    this.popup.open();
  }

}

const CallManager = new CallPopupManager();
