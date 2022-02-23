export async function GetFieldParams(allFilters) {
  let query = '';
  let categories = allFilters?.lead_category;
  let categoryTypes = allFilters?.lead_type;
  let assignees = allFilters?.assignee;
  let leadSources = allFilters?.lead_source;
  let refId = allFilters?.lead_ref_id;
  let email = allFilters?.lead_client_email;
  let slug = allFilters?.slugs;

  if (refId !== '' && refId != null) {
    query = query + 'f[reference_number]=' + refId + '&';
  }
  if (email !== '' && email != null) {
    query = query + 'f[client.email]=' + email + '&';
  }
  if (slug && slug.length > 0) {
    slug.map(item => {
      query = query + 'f[category.slug][]=' + item?.slug + '&';
    });
  }
  if (assignees && assignees.length > 0) {
    assignees.map(item => {
      query = query + 'f[assignee.id][]=' + item.id + '&';
    });
  }
  if (leadSources && leadSources.length > 0) {
    leadSources.map(item => {
      query = query + 'f[lead_source.id][]=' + item.id + '&';
    });
  }
  if (categoryTypes && categoryTypes.length > 0) {
    categoryTypes.map(item => {
      query = query + 'f[category_type.id][]=' + item.id + '&';
    });
  }

  if (query !== '') {
    return '&' + query;
  }
}
