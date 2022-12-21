package com.example.springprueba.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity(name = "itemproducto")
@Data
public class itemProducto implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String serial;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double costo;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double monto;

   // @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer cantidad;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double costome;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String unidad;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double precioProducto;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Date fechaact;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer ope;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double salidas;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double invinicial;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double ingresos;
   @Transient
   @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double saldo;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double costoTotal;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String codigo;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer nrodoc;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String nombre;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Long producto_id;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Double iva;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String clienteNombre;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String proveedorNombre;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String productoNombre;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String depositoNombre;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String codigoDeposito;
    @Transient
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String observaciones;

    @ManyToOne
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "producto_id")
    private producto producto;

    @ManyToOne(cascade = {CascadeType.MERGE})
    @JsonInclude(JsonInclude.Include.NON_NULL)
    @JoinColumn(name = "transproducto_id")
    private transactionProduct transproducto;
    public itemProducto(){}
    public itemProducto(String serial){
        this.serial=serial;
    }
    public itemProducto(Long id, String serial, Double costome, Double costo, Double salidas, Double ingresos, Double invinicial, String codigo, String nombreP, String nombreU){
        this.id = id;
        this.serial= serial;
        this.costome=costome;
        this.unidad= nombreU;
        this.costo= costo;
        this.salidas= salidas;
        this.ingresos= ingresos;
        this.invinicial = invinicial;
        this.codigo = codigo;
        this.nombre = nombreP;
        this.costoTotal = this.salidas*this.costo;
    }
    public itemProducto(Long id,Date fecha, Integer cantidad, producto producto,Integer nrodoc, Integer oper, String detalle, String codigo, Long producto_id, String nombre, String nombreUnidad, String depositoNombre){
        this.id= id;
        this.cantidad= cantidad;
        this.nombre=nombre;
        this.producto = producto;
        //this.transproducto= transactionProduct;
        this.codigo = codigo;
        this.producto_id = producto_id;
        this.unidad= nombreUnidad;
        this.depositoNombre = depositoNombre;
        this.fechaact = fecha;
        this.nrodoc = nrodoc;
        this.ope = oper;
        this.observaciones =detalle;
    }
    public itemProducto(Long id, Integer cantidad, producto producto, transactionProduct transactionProduct, String codigo, Long producto_id, String nombre, String nombreUnidad, Double costo){
        this.id= id;
        this.cantidad= cantidad;
        this.nombre=nombre;
        this.producto = producto;
        this.transproducto= transactionProduct;
        this.codigo = codigo;
        this.producto_id = producto_id;
        this.unidad= nombreUnidad;
        this.costo = costo;
       // this.costoTotal = costo*cantidad;
    }
    public itemProducto(Long id, Date fecha, Integer nroDoc, Integer oper, String observaciones, String serial, Double costoU, Integer cantidad, producto producto1,  transactionProduct transproducto1, String codigo){
        this.id = id;
        this.fechaact = fecha;
        this.nrodoc=nroDoc;
        this.ope= oper;
        this.serial= serial;
        this.observaciones = observaciones;
        this.costo=costoU;
        this.cantidad = cantidad;
        this.saldo=0.0;
        this.producto= producto1;
        this.codigo=codigo;
        this.transproducto = transproducto1;
        this.costoTotal=0.0;
        this.ingresos=0.0;
    }
    public itemProducto(Long id, Date fecha, Integer nroDoc, Integer oper, String observaciones, String serial, Double costoU, Integer cantidad, Long prod_Id, String codigo, String nombre){
        this.id = id;
        this.fechaact = fecha;
        this.nrodoc=nroDoc;
        this.ope= oper;
        this.serial= serial;
        this.observaciones = observaciones;
        this.costo=costoU;
        this.cantidad = cantidad;
        this.producto_id=prod_Id;
        this.saldo=0.0;
      //  this.producto= producto1;
        this.codigo=codigo;
      //  this.transproducto = transproducto1;
        this.costoTotal=0.0;
        this.ingresos=0.0;
        this.nombre = nombre;
    }
    public itemProducto(Long id, Date fecha, Integer nroDoc, Integer oper, String observaciones, String serial, Double costoU, Integer cantidad, producto pr){
        this.id = id;
        this.fechaact = fecha;
        this.producto = pr;
        this.nrodoc=nroDoc;
        this.ope= oper;
        this.serial= serial;
        this.observaciones = observaciones;
        this.costo=costoU;
        this.cantidad = cantidad;
        this.producto_id=producto.getId();
        this.saldo=0.0;
        //  this.producto= producto1;
        this.codigo=producto.getCodigo();
        //  this.transproducto = transproducto1;
        this.costoTotal=0.0;
        this.ingresos=0.0;
        this.nombre = producto.getNombre();
    }
    public itemProducto(Long id, Date fecha, Integer nroDoc, Integer oper, String observaciones, String serial, Double costoU, Integer cantidad, Long prod_Id, String codigo, String nombre, String depositoNombre){
        this.id = id;
        this.fechaact = fecha;
        this.nrodoc=nroDoc;
        this.ope= oper;
        this.serial= serial;
        this.observaciones = observaciones;
        this.costo=costoU;
        this.cantidad = cantidad;
        this.producto_id=prod_Id;
        this.saldo=0.0;
        //  this.producto= producto1;
        this.codigo=codigo;
        //  this.transproducto = transproducto1;
        this.costoTotal=0.0;
        this.ingresos=0.0;
        this.nombre = nombre;
        this.depositoNombre=depositoNombre;
    }
    public itemProducto(Long id, Date fecha, Integer nroDoc, Integer oper, String observaciones, String serial, Double costoU, Integer cantidad, Long prod_Id, String codigo, String nombre, String depositoNombre, transactionProduct transactionProduct){
        this.id = id;
        this.fechaact = fecha;
        this.nrodoc=nroDoc;
        this.ope= oper;
        this.serial= serial;
        this.observaciones = observaciones;
        this.costo=costoU;
        this.cantidad = cantidad;
        this.producto_id=prod_Id;
        this.saldo=0.0;
        //  this.producto= producto1;
        this.codigo=codigo;
        //  this.transproducto = transproducto1;
        this.costoTotal=0.0;
        this.ingresos=0.0;
        this.nombre = nombre;
        this.depositoNombre=depositoNombre;
        this.transproducto = transactionProduct;
    }
    public itemProducto(Long id,String proveedorName,Date fecha, Integer nrodoc, Integer ope, String detalle, Integer cantidad, String serial, String nombre){
        this.id = id;
        this.fechaact =fecha;
        this.proveedorNombre = proveedorName;
        this.nrodoc = nrodoc;
        this.ope = ope;
        this.observaciones = detalle;
        this.cantidad = cantidad;
        this.serial = serial;
        this.nombre = nombre;
    }
    public itemProducto(Long id, String nombreProducto){
        this.producto_id=id;
        this.productoNombre= nombreProducto;
    }
    public itemProducto(Long id,Date fecha, Integer nrodoc,String nombreCliente, Integer ope, String detalle, Integer cantidad, String serial, String nombre){
        this.id = id;
        this.fechaact =fecha;
        this.clienteNombre = nombreCliente;
        this.nrodoc = nrodoc;
        this.ope = ope;
        this.observaciones = detalle;
        this.cantidad = cantidad;
        this.serial = serial;
        this.nombre = nombre;

    }
    public itemProducto(String codigo, String descripcion, String unidad, Integer cantidad, Integer opeP, Double salidas, Double ingresos){
        this.codigo =  codigo;
        this.nombre = descripcion;
        this.unidad = unidad;
        this.cantidad= cantidad;
        this.ope= opeP;
        this.salidas = salidas;
        this.ingresos= ingresos;
        this.saldo = this.ingresos-this.salidas;
    }
    public itemProducto(Long id,String proveedorName,Date fecha, Integer nrodoc, Integer ope, String detalle, Integer cantidad, String serial, String nombre, String depositoNombre){
        this.id = id;
        this.fechaact =fecha;
        this.proveedorNombre = proveedorName;
        this.nrodoc = nrodoc;
        this.ope = ope;
        this.observaciones = detalle;
        this.cantidad = cantidad;
        this.serial = serial;
        this.nombre = nombre;
        this.depositoNombre= depositoNombre;
    }

    public itemProducto(Long id,String codigo,Date fecha, Integer nrodoc, Integer ope, String unidadNombre, Integer cantidad, String serial, String nombre, String depositoNombre, String codigoDeposito){
        this.id = id;
        this.fechaact =fecha;
        this.codigo = codigo;
        this.nrodoc = nrodoc;
        this.ope = ope;
        this.unidad = unidadNombre;
        this.cantidad = cantidad;
        this.serial = serial;
        this.nombre = nombre;
        this.depositoNombre= depositoNombre;
        this.codigoDeposito = codigoDeposito;
    }
    public itemProducto(Long id,Date fecha, Integer nrodoc,String nombreCliente, Integer ope, String detalle, Integer cantidad, String serial, String nombre, String depositoNombre){
        this.id = id;
        this.fechaact =fecha;
        this.clienteNombre = nombreCliente;
        this.nrodoc = nrodoc;
        this.ope = ope;
        this.observaciones = detalle;
        this.cantidad = cantidad;
        this.serial = serial;
        this.nombre = nombre;
        this.depositoNombre = depositoNombre;
    }
    public itemProducto(transactionProduct transactionProduct, Double costoTotal, producto producto, Integer cantidad, Double costo){
        this.transproducto = transactionProduct;
        this.costoTotal=costoTotal;
        this.producto = producto;
        this.cantidad = cantidad;
        this.costo = costo;
    }
    public itemProducto(transactionProduct transactionProduct, producto producto, Integer cantidad, Double costo, Double precioProducto){
        this.transproducto = transactionProduct;
        this.costoTotal=costo * cantidad;
        this.productoNombre = producto.getNombre();
        this.serial = producto.getSerial();
        this.cantidad = cantidad;
        this.costo = costo;
        this.precioProducto= precioProducto;
    }
    public itemProducto(transactionProduct tr, producto pr, Integer cantidad, Double costo, String serial){
        this.transproducto = tr;
        this.producto = pr;
        this.cantidad = cantidad;
        this.costo = costo;
        this.monto = costo*cantidad;
        this.serial=serial;
    }

}
