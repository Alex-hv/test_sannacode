class Calculator{

  constructor(){
    let calcButtons = document.getElementById('buttons');
    let buttons=['7','8','9','/','4','5','6','*','1','2','3','-','0','(',')','+'];
    buttons.forEach((button) => {
      let newButton = document.createElement('button');
      newButton.onclick = ()=>{calc.append(button)}
      newButton.innerHTML = button
      calcButtons.appendChild(newButton);
    })
  }

  append(item){
    document.getElementById('calc-field').value += item
    document.getElementById('calc-field').focus();
  }

  getResult(){
    let field = document.getElementById('calc-field').value;
    if(this.checkField(field)){
      document.getElementById('calc-field').value = this.parse(field)
    }
    else{
      alert('Ошибка!');
    }
    document.getElementById('calc-field').focus();
  }

  clear(){
    document.getElementById('calc-field').value = ''
    document.getElementById('calc-field').focus();
  }

  checkField(field){
    if(field.match(/[A-Za-z!@#$%^&±]/g))return false
    let count=0;
    field.split('').forEach((item) => {
      if(item=='(')count++;
      if(item==')')count--;
    })
    if(count!=0)return false;
    return true
  }

  parse(field){
    let mass = field.replace(/\s/g,'').split(/([()])/g)
    if(mass.some(elem=>elem=='('||elem==')')){
      let start,end;
      do{
        for(let i=0;;i++){
          if(mass[i]=='('){
            start=i;
          }
          if(mass[i]==')'){
            end=i;
            break;
          }
        }
        mass.splice(
          start,
          (end-start+1),
          this.calculate(mass.slice(start+1,end).join(''))
        )
      }while(mass.some(elem=>elem==='('||elem===')'))
    }
    return this.calculate(mass.join(''))
  }

  calculate(exp){

    let mass = exp.replace(/(\d)(\-)(\d)/g,"$1+-$3")
    .replace(/(\-\-)/g,"+")
    .split(/([\+\*\/])/g);

    for(let i=0;mass.some(elem=>elem==='/'||elem==='*');i++){
      if(mass[i]=='*'){
        mass.splice(i-1,3,(+mass[i-1]*(+mass[i+1])));
        i=0;
      }
      if(mass[i]=="/"){
        mass.splice(i-1,3,(+mass[i-1]/(+mass[i+1])));
        i=0;
      }
    }
    mass = mass.join('').split(/([\+])/g)
    for(let i=0;mass.some(elem=>elem==='+');i++){
      if(mass[i]=='+'){
        mass.splice(i-1,3,(+mass[i-1]+(+mass[i+1])));
        i=0;
      }
    }
    return mass.join('')
  }
}

let calc = new Calculator()
