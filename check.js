$(document).ready(function(){
    
    if(tbCookieExists()) {
        var dc= document.cookie;
        var temp= dc.split("=");
        console.log(temp);
        
        var arr= JSON.parse(temp[1]);
        var loc= window.location.href;
        for(var i=2; i< arr.length; i++) {
            if(arr[i].url===loc) {
                $(".tacboard-form").css("display", "none");
                var html= '<div id="redirbtn"><a href="https://thetacboard.com" target="_blank"><button id="tacked" type="button">Tacked at $'+arr[i].tackedPrice+'</button></a></div>';
                $("#tacboard").prepend(html);
                
            }
        }
    } else if(incompleteTbCookieExists()) {
         var dc= document.cookie;
        var temp= dc.split("=");
        console.log(temp);
        
        var obj= JSON.parse(temp[1]);
        if(obj.url===window.location.href) {
            $(".tacboard-form").css("display", "none");
                var html= '<div id="redirbtn"><a href="https://thetacboard.com" target="_blank"><button id="tacked" type="button">Tacked at $'+obj.tackedPrice+'</button></a></div>';
             $("#tacboard").prepend(html);
        }
        
    }
    
var important= document.getElementById("tac-input");
important.setAttribute('size', important.getAttribute('placeholder').length);
    
    
          var btn;
      if($("input[type='submit'][name='add']").length>0) {
          var btn= $("input[type='submit'][name='add']").outerWidth();
      } else if($("button[type='submit'][name='add']").length>0) {
         var btn= $("button[type='submit'][name='add']").outerWidth(); 
      }
          var tacb= $("#tacboard").outerWidth();
        console.log(btn+tacb);
    console.log("btn:"+btn);
    console.log("tacb:"+tacb);
          $("#cartAndTb").width(btn+tacb+110);
    
    
    

   
    
    $(".tacboard-form").keypress(function(event){
        return event.keyCode != 13;
    });
    
    
    $("#tacit").click(function(){
        var x= $("#tac-input").val()+"";
        x= parseInt(x.substring(1));
        var html= '<div id="redirbtn"><a href="https://thetacboard.com" target="_blank"><button id="tacked" type="button">Tacked at $'+x+'</button></a></div>';
            console.log(x);
        
            if((!isNaN(x)) && (x!=="")) {
                console.log("good");
                //tb cookie blue print: "tacboard={tacs objects}";
                if(tbCookieExists()) {
                    //send ajax post request w/ url and tacked price 
                    console.log("IT EXISTS!");
                    
                   $.post("http://localhost:3000/store-new-tac", {tackedPrice: x, url: encodeURI(window.location.href)});
                    
                  
                    $(".tacboard-form").css("display", "none");
                    
                    $("#tacboard").prepend(html);
                        //    <div id="redirbtn"><a href="https://thetacboard.com" target="_blank"><button id="tacked" type="button">Tacked at $90</button></a></div>
                    //hide html & create button that shows tacked price
                    return false;
                } else {
               
               //var imp= document.getElementById("tacit");
                //imp.setAttribute("type", "submit");
                
                var y= window.location.href;
                //imp.click();
                window.open('http://localhost:3000/signup-pop?price='+x+'&url='+encodeURIComponent(y), 'newwindow', 'width=600, height=450'); 
                //imp.setAttribute("type", "button");
                //document.location.replace("/");
                runner();
                return false;
            }
          }

    });
    
  function runner() {
      var counter= 1;
      var hope= setInterval(function(){
          var dc= document.cookie;
          var temp= dc.split("=");
          
          if(temp==="tacboard" || temp==="incompleteTb") {
              clearInterval(hope);
              window.location.reload();
          }
          counter++;
         
          
          if(counter>= 9000) {
              clearInterval(hope);
          }
      }, 100);  
      
  } 
    
  
    function tbCookieExists() {
        var dc= document.cookie;
        console.log(dc);
        var tb= "tacboard=";
        var verifier= dc.indexOf(tb);
        
        if(verifier=== -1) {
            return false;
        } else {
            return true;
        }
    }
    
    function incompleteTbCookieExists(){
        var dc= document.cookie;
        console.log(dc);
        var tb= "incompleteTb=";
        var verifier= dc.indexOf(tb);
        
        if(verifier=== -1) {
            return false;
        } else {
            return true;
        }
    }

/*keep $ symbol present!*/
    
var readOnlyLength = 2;


 
 $("#tac-input").focus(function(){
	$(this).val("$ ");
 });
 
 $("#tac-input").blur(function(){
     if($(this).val()==="$ ") {
         $(this).val("");
        $(this).attr("placeholder", "$ PRICE I'D PAY");
     }
 
 });
 
 

$("#tac-input").on("click", function(){
	
	
		if(this.selectionStart< readOnlyLength) {
    	
    	this.selectionEnd= 3;
    }
});




$('#tac-input').on('keypress, keydown', function(event) {
    //console.log(event.which);
    if((event.which== 39) && ($("#tac-input").val()=== "$ ")) {
        
  	     this.selectionStart= 3;
    }
    
    
    if(event.which== 38) {
    return false;
    }
    
    //console.log(this.selectionStart, this.selectionEnd);
      var start= this.selectionStart;
      var end= this.selectionEnd;
      var len= $("#tac-input").val().length;
    if(end-start===2) {
        return false;
    }
    
     if((end-start===len) && (event.which!==8) && (event.which!==39)) {
        console.log(event.which);
        $("#tac-input").val("$ ");
   
    }
    
    
    
    
    if(((event.which== 8) || (event.which== 37)) && ((this.selectionStart< readOnlyLength) || (this.selectionStart== readOnlyLength))) {
    	
      if((event.which== 8) && (end-start===len)) {

        $("#tac-input").val("$  ");
          
      } else {
      	return false;
      }
    	
    }
    
 
});                    
    
    
    

    

});

