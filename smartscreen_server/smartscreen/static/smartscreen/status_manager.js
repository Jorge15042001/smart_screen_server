
class StatusManager{
  constructor(status_container_id, defalut_message = "Esperando ...") {
    this.defalut_message = defalut_message;
    this.status_elem = document.getElementById(status_container_id);
    this.active = false;
    this.timeout = undefined;
  }
  setStatus(message, permanent = true) {
    if (this.active) {
      this.clearStatus();
    };


    this.status_elem.innerText = message;
    if (permanent) return;
    
    this.active = true;

    this.timeout = setTimeout(() => this.clearStatus(), 3000);

  }
  clearStatus() {
    if (!this.active) return;

    this.status_elem.innerText = this.defalut_message
    this.active = false;
    this.timeout = undefined;
  }
};

const statusManager = new StatusManager("status_text");
