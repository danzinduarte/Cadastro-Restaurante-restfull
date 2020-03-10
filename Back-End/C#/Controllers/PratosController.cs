using Api.repository;
using Microsoft.AspNetCore.Mvc;
using System;
using Api.Models;
using Api.Controllers;

namespace Api.Controllers
{
    [Route("api/[Controller]")]
    public class PratosController : Controller
    {
        private readonly IPratosRepository _pratosRepository;
        public PratosController(IPratosRepository pratosRepo)
        {
            _pratosRepository = pratosRepo;
        }

        [HttpGet]
        public ActionResult<RetornoView<Pratos>> GetAll()
        {
            return Ok (new{data = _pratosRepository.GetAll()});
        }  
        
        [HttpGet("{id}", Name = "GetPratos")]
        public ActionResult<RetornoView<Pratos>> GetById(int id)
        {
            
            var pratos = _pratosRepository.Find(id);
            if(pratos==null)
            {
                return NotFound();           
            }
            return Ok( new {data = pratos});
        }
        [HttpPost]
        public ActionResult<RetornoView<Pratos>> Create ([FromBody]Pratos pratos)
        {
            
            try
            {
                
                _pratosRepository.Add(pratos);
            }
            catch (Exception ex) 
            {
                var result = new RetornoView<Pratos>() { sucesso = false, erro = ex.Message };
                return BadRequest(result);
            }

            var resultado = new RetornoView<Pratos>() { data = pratos, sucesso = true };
            return CreatedAtRoute("GetPratos", new { id = pratos.Id}, resultado);  
            
            
        }
        [HttpPut("{id}")]
        public ActionResult<RetornoView<Pratos>> Update(int id, [FromBody] Pratos pratos)
        {
            var _pratos = _pratosRepository.Find(id);
            if(_pratos == null)
            {
                return NotFound();
            }        
            try 
            {

                _pratos.NomeDoPrato  = pratos.NomeDoPrato; 
                _pratos.Preco        = pratos.Preco;
                
                _pratosRepository.Update(_pratos);
            }
             catch (Exception ex)
            {
                var result = new RetornoView<Pratos>() { sucesso = false, erro = ex.Message };
                return BadRequest(result);
            }

            var resultado = new RetornoView<Pratos>() { data = _pratos, sucesso = true };
            return resultado;
            
        }
        [HttpDelete("{id}")]
        public ActionResult<RetornoView<Pratos>> Delete(int id) 
        {
            var pratos  = _pratosRepository.Find(id);
            if (pratos == null) 
            {
                return NotFound();
            }
                
                _pratosRepository.Remove(id);
                    
            if (_pratosRepository.Find(id) == null) 
            {
                var resultado = new RetornoView<Pratos>() { sucesso = true };
                return resultado;
                
            }
            else 
            {
                var resultado = new RetornoView<Pratos>() { sucesso = false };
                return BadRequest(resultado);
            }
        }
    }
}