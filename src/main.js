var requestInterceptor = `
var s_ajaxListener = new Object();
s_ajaxListener.tempOpen = XMLHttpRequest.prototype.open;
s_ajaxListener.tempSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  s_ajaxListener.tempOpen.apply(this, arguments);
  s_ajaxListener.method = a;  
  s_ajaxListener.url = b;
  if (a.toLowerCase() == 'get') {
    s_ajaxListener.data = b.split('?');
    s_ajaxListener.data = s_ajaxListener.data[1];
  }
}

XMLHttpRequest.prototype.send = function(a,b) {
  if (!a) var a='';
  if (!b) var b='';
  
  if (s_ajaxListener.url && (
      s_ajaxListener.url.indexOf('FieldsAndRelationshipsDetailList.queryDetails') > -1
      || s_ajaxListener.url.indexOf('ObjectList.getObjectListRecords') > -1
      )
    ) {
    a = a.replace(/(?<=pageSize%22%3A).*?(?=%2C)/gi, '1000')
    a = a.replace(/(?<=offset%22%3A).*?(?=%2C)/gi, '0')

  }
  
  s_ajaxListener.tempSend.apply(this, arguments);
  if(s_ajaxListener.method.toLowerCase() == 'post')s_ajaxListener.data = a;
}`;

var script = document.createElement('script');
script.textContent = requestInterceptor;
(document.head||document.documentElement).appendChild(script);
script.remove();

