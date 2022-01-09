using CoursesREST.Data;
using CoursesREST.Data.Auth.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CoursesREST.Controllers
{
	[ApiController]
	[Route("api/categories")]
	public class CategoriesController : ControllerBase
	{
		private readonly ICategoriesRepository _categoriesRepository;
		public CategoriesController(ICategoriesRepository categoriesRepository)
		{
			_categoriesRepository = categoriesRepository;
		}

		[HttpGet]
		public async Task<IEnumerable<Category>> GetAll()
		{
			return await _categoriesRepository.GetAll();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Category>> Get(int id)
		{
			var category = await _categoriesRepository.Get(id);
			if (category == null) return NotFound();
			return Ok(category);
		}

		[HttpPost]
		[Authorize(Roles = DemoRestUserRole.Admin)]
		public async Task<ActionResult<Category>> Insert(Category category)
		{
			if (category.Name != null && category.Description != null &&
				category.Name != "" && category.Description != "")
			{
				await _categoriesRepository.Insert(category);
				return Created($"/api/categories/{category.Id}", category);
			}
            else
            {
				return UnprocessableEntity();
            }
		}

		[HttpPatch("{id}")]
		[Authorize(Roles = DemoRestUserRole.Admin)]
		public async Task<ActionResult<Category>> Update(int id, Category category)
		{
			var exists_category = await _categoriesRepository.Get(id);
			if (exists_category == null) return NotFound();

			exists_category.Name = category.Name;
			exists_category.Description = category.Description;

			if (exists_category.Name != null && exists_category.Description != null &&
				exists_category.Name != "" && exists_category.Description != "")
			{
				await _categoriesRepository.Update(exists_category);

				return Ok(category);
			}

			return UnprocessableEntity();
		}

		[HttpDelete("{id}")]
		[Authorize(Roles = DemoRestUserRole.Admin)]
		public async Task<ActionResult<Category>> Delete(int id)
		{
			var exists_category = await _categoriesRepository.Get(id);
			if (exists_category == null) return NotFound();

			await _categoriesRepository.Delete(exists_category);

			return NoContent();
		}

	}
}
