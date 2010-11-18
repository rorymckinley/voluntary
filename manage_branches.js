$(function() {
  add_create_functionality();
  add_update_functionality();
  fetch_existing_branches();
});

function add_create_functionality() {
  $('#voluntary_add_branch').html('Branch Name&nbsp;&nbsp;&nbsp;');
  $('#voluntary_add_branch').append($('<input type="text">').attr('maxlength', 100).attr('id', 'new_branch'));
  submit = $('<input type="submit">').val('Create Branch');
  submit.click( function() {
      submit_branch_details();
      });
  $('#voluntary_add_branch').append(submit);
}

function add_update_functionality() {
  $('#voluntary_update_branch').html('Branch Name&nbsp;&nbsp;&nbsp;');
  $('#voluntary_update_branch').append($('<input type="text">').attr('maxlength', 100).attr('id', 'updated_branch'));
  $('#voluntary_update_branch').append($('<input type="hidden">').attr('id', 'branch_id'));
  submit = $('<input type="submit">').val('Update Branch');
  submit.click( function() {
      update_branch_details();
      });
  $('#voluntary_update_branch').append(submit);
}

function fetch_existing_branches(selected_id) {
  $.get(Drupal.settings.voluntary.list_branches_url, null, function(data) {
      build_branch_selector(data, selected_id);
      }, 
      'json');
}

function build_branch_selector(data, id) {
  $('#voluntary_view_branches').empty();
  dropdown = $('<select>').attr('id', 'voluntary_branch_dropdown');
  $.each(data, function(index, record){
      opt = $('<option>').val(record.id).html(record.name)
      if (id && record.id == id) {
        opt.attr('selected', true);
        populate_for_edit(record.id, record.name);
      }
      dropdown.append(opt);
      });
  $('#voluntary_view_branches').append(dropdown);
  dropdown.change(function(event) {
      populate_for_edit($(this).find('option:selected').val(), $(this).find('option:selected').html());
      })
}

function submit_branch_details() {
  $.post(Drupal.settings.voluntary.save_branches_url, { name: $('#new_branch').val() }, handle_successful_save, 'json');
}

function handle_successful_save(data) {
  saved_id = data.id;
  $('#new_branch').val('');
  fetch_existing_branches(saved_id);
}

function populate_for_edit(id, name) {
  $('#branch_id').val(id);
  $('#updated_branch').val(name);
}

function update_branch_details() {
  $.post(Drupal.settings.voluntary.save_branches_url, { name: $('#updated_branch').val(), id: $('#branch_id').val() }, handle_successful_save, 'json');
}

