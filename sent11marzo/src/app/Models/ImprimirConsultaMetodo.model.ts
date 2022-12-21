export class ImprimirConsultas{
  downLoadFile(data: any, type: string) {
    var blob = new Blob([data], { type: type});
    var url = window.URL.createObjectURL(blob);
    var pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
        alert( 'Please disable your Pop-up blocker and try again.');
    }
  }
}
