import { ModelNivelUsuario } from "src/app/Models/nivelUsuario.model";
import { DerechosModel } from "./Derechos.model";


export class AdministrarRutas{
  clase:clase;
  subClases:subClase[];
  constructor(clase: clase, subClase: subClase[]){
    this.clase=clase;
    this.subClases=subClase;
  }


}
export class LocalStorageNiveles{
  buscarNivel(nombre:String){
    var nombres:string[] = JSON.parse( localStorage.getItem('verificarGestionProducto')||'{}');
    var niveles:string[] = JSON.parse( localStorage.getItem('nivelesDerechos')||'{}');
    var indice = -1;
    for(var i = 0; i < nombres.length; i++){
      if(nombres[i]==nombre){
        indice = i;
      }
    }
    return niveles[indice];
  }
}
export class AdministrarVectorRutas{
  clases:AdministrarRutas[];
  nombreRutas:String[]=[];
  nivelesDerechoIndexVector:Number[]=[];
  constructor(administrarRutas:AdministrarRutas[]){
    this.clases=administrarRutas;
  }
  ifAdmin(verificar:String){
    if(verificar=="ADMIN"){
      this.clases.forEach(datos=>{
        datos.clase["valor"]=true;
        datos.subClases.forEach(dataSubClases=>{
          dataSubClases["valor"]=true;
        })
      })
      this.nombreRutas.push("ADMIN");
    }

  }
  allFalse(){
    this.clases.forEach(datos=>{
      datos.clase["valor"]=false;
      datos.subClases.forEach(dataSubClases=>{
        dataSubClases["valor"]=false;
      })
    })
    this.nombreRutas=[];
  }
  getNombreRutas(){
    return this.nombreRutas;
  }
  cambiarValores(derechos: DerechosModel[]){
      derechos.forEach(nivelesClase=>{
        if(nivelesClase.modulo.clase=="no"){
          this.verificarBotonAngular(nivelesClase.modulo.subclase);
        }else if(nivelesClase.modulo.subclase=="no"){
          this.clases.forEach(barraAngular=>{
            if(nivelesClase.modulo.clase == barraAngular.clase.clase){
              barraAngular.clase.valor=true;
              barraAngular.subClases.forEach(subClases=>{
                if(nivelesClase.nivel==2 || nivelesClase.nivel==3 || nivelesClase.nivel==6 || nivelesClase.nivel==7 || nivelesClase.nivel==15){
                  subClases.valor=true;
                }

              })
            }
          })
        }
      })
  }
  vectorStringNivelUsuario(nivel: DerechosModel[]){ // verificar
    this.nombreRutas=[]
    this.nivelesDerechoIndexVector=[]
    nivel.forEach(datos=>{
      if(datos.modulo.clase!="no"){
        this.nombreRutas.push(datos.modulo.nombre);
        this.nivelesDerechoIndexVector.push(datos.nivel);
      }else if(datos.modulo.subclase!="no"){
        this.nombreRutas.push(datos.modulo.nombre);
        this.nivelesDerechoIndexVector.push(datos.nivel);
      }
    })
    console.log()
    console.log("el vector es"+this.nombreRutas);
  }
  stringtoModelNivel(storage: String[]){
    storage.forEach(palabra=>{
      this.clases.forEach(vectorClases=>{
        if(vectorClases.clase.clase==palabra){
          vectorClases.clase["valor"]=true;
          vectorClases.subClases.forEach(subclases=>{
            if(subclases['clase']!='GESTION PRODUCTO'){
              subclases["valor"]=true;
            }
          })
        }else{
          vectorClases.subClases.forEach(subClases=>{
            if(subClases.clase==palabra){
              vectorClases.clase["valor"]=true;
              subClases["valor"]=true;
            }
          })
        }
      })
    })
    return this.clases;
  }
  verificarBotonAngular(nombre:String){
    var verificar= 0;
    this.clases.forEach(datos=>{
      datos.subClases.forEach(data=>{
        if(data.clase==nombre){
          datos.clase.valor=true;
          data.valor=true;
        }
      })
    })
  }
  nombres(){
    var retornarJson:any=[];
    this.clases.forEach(datos=>{
        var clasePrincipal = datos.clase.clase;
        datos.subClases.forEach(subclases=>{
          var json = {'clase':clasePrincipal, 'subClase':subclases.clase}
          retornarJson.push(json);
        })
    })
    console.log(retornarJson);
    return retornarJson;
  }
  encontrarPorNombresTabla(vectorNombres:String[]){
    var vectorTabla:Tabla[] = [];

    vectorNombres.forEach(datos=>{
        this.clases.forEach(clasesVector=>{
            var nombreClase = clasesVector.clase.clase;
            var verificar = 0;
            if(nombreClase==datos){
              var tabla:Tabla={clase:nombreClase,subclase:"no"};
              vectorTabla.push(tabla);
            }else{
              clasesVector.subClases.forEach(subclaseForeach=>{
                var subclase = subclaseForeach.clase;

                if(subclase==datos && verificar==0){
                  var tabla:Tabla = {clase:"no", subclase:subclase};
                  vectorTabla.push(tabla);
                  verificar=1;
                }
              })
            }
        })
    })
    return vectorTabla;
  }
  claseOsubClase(dato:String){
    var retornar = "";
      this.clases.forEach(clasesVector=>{
          var nombreClase = clasesVector.clase.clase;
          if(nombreClase==dato){
            retornar = "clase"
          }else{
            clasesVector.subClases.forEach(subclaseForeach=>{
              var subclase = subclaseForeach.clase;
              if(subclase==dato){
                retornar= "subClase";
              }
            })
          }
  })
  return retornar;
  }
  mandarJson(vectorNombres:String[], nivelNombre:String){
    var mandarJson:mandarJson[] = [];

    vectorNombres.forEach(datos=>{
        var verificarclase= 0 ;
        this.clases.forEach(clasesVector=>{
            var nombreClase = clasesVector.clase.clase;
            var verificarsubclase = 0;
            if(nombreClase==datos && verificarclase==0){
              var json:mandarJson|any={claseOsubclase:"clase",claseNombre:nombreClase,nivelNombre:nivelNombre};
              mandarJson.push(json);
              verificarclase=1;
            }else{
              clasesVector.subClases.forEach(subclaseForeach=>{
                var subclase = subclaseForeach.clase;

                if(subclase==datos && verificarsubclase==0){
                  var json:mandarJson|any = {claseOsubclase:"subclase", claseNombre:subclase, nivelNombre:nivelNombre};
                  mandarJson.push(json);
                  verificarsubclase=1;
                }
              })
            }
        })
    })
    return mandarJson;
  }

}
export interface clase{
  clase:String;
  valor:Boolean;
  nombre:String;
}
export interface subClase{
  clase:String;
  valor:Boolean;
  nombre:String;
}
export interface mandarJson{
  claseOsubclase:String;
  claseNombre:String;
  nivelNombre:String;
  id:Number;
  idNivel:Number;
}
export interface Tabla{
  clase:String;
  subclase:String;
}
export interface serializarJson{
  valor:mandarJson[];
}
