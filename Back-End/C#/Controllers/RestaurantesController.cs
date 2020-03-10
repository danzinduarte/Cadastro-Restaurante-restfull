using Api.repository;
using Microsoft.AspNetCore.Mvc;
using System;
using Api.Models;
using Api.Controllers;

namespace Api.Controllers
{
    [Route("api/[Controller]")]
    public class RestaurantesController : Controller
    {
        private readonly IRestaurantesRepository _restaurantesRepository;
        public RestaurantesController(IRestaurantesRepository restaurantesRepo)
        {
            _restaurantesRepository = restaurantesRepo;
        }

        [HttpGet]
        public ActionResult<RetornoView<Restaurantes>> GetAll()
        {
            return Ok (new{data = _restaurantesRepository.GetAll()});
        }  
        
        [HttpGet("{id}", Name = "GetRestaurantes")]
        public ActionResult<RetornoView<Restaurantes>> GetById(int id)
        {
            
            var restaurantes = _restaurantesRepository.Find(id);
            if(restaurantes==null)
            {
                return NotFound();           
            }
            return Ok( new {data = restaurantes});
        }
        [HttpPost]
        public ActionResult<RetornoView<Restaurantes>> Create ([FromBody]Restaurantes restaurantes)
        {
            
            try
            {
                _restaurantesRepository.Add(restaurantes);
            }
            catch (Exception ex) 
            {
                var result = new RetornoView<Restaurantes>() { sucesso = false, erro = ex.Message };
                return BadRequest(result);
            }

            var resultado = new RetornoView<Restaurantes>() { data = restaurantes, sucesso = true };
            return CreatedAtRoute("GetRestaurantes", new { id = restaurantes.Id}, resultado);  
            
            
        }
        [HttpPut("{id}")]
        public ActionResult<RetornoView<Restaurantes>> Update(int id, [FromBody] Restaurantes restaurantes)
        {
            var _restaurantes = _restaurantesRepository.Find(id);
            if(_restaurantes == null)
            {
                return NotFound();
            }        
            try 
            {

                _restaurantes.NomeDoRestaurante  = restaurantes.NomeDoRestaurante; 
                
                _restaurantesRepository.Update(_restaurantes);
            }
             catch (Exception ex)
            {
                var result = new RetornoView<Restaurantes>() { sucesso = false, erro = ex.Message };
                return BadRequest(result);
            }

            var resultado = new RetornoView<Restaurantes>() { data = _restaurantes, sucesso = true };
            return resultado;
            
        }
        [HttpDelete("{id}")]
        public ActionResult<RetornoView<Restaurantes>> Delete(int id) 
        {
            var restaurantes  = _restaurantesRepository.Find(id);
            if (restaurantes == null) 
            {
                return NotFound();
            }
                
                _restaurantesRepository.Remove(id);
                    
            if (_restaurantesRepository.Find(id) == null) 
            {
                var resultado = new RetornoView<Restaurantes>() { sucesso = true };
                return resultado;
                
            }
            else 
            {
                var resultado = new RetornoView<Restaurantes>() { sucesso = false };
                return BadRequest(resultado);
            }
        }
    }
}