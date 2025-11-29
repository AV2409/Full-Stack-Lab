import React, { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

const PostJobPage = ({ onPostJob, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '', company: 'TechNova', location: 'Remote', type: 'Full-time', salary: '', description: '', tags: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onPostJob({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
      applicants: 0
    });
  };

  return (
    <div className="page-container">
      <h2>Post a New Job</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <Input label="Job Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <Input label="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
            <Input label="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} required />
            <div className="input-group">
               <label className="input-label">Job Type</label>
               <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                 <option>Full-time</option>
                 <option>Part-time</option>
                 <option>Contract</option>
               </select>
            </div>
            <Input label="Salary Range" placeholder="e.g. $100k - $120k" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} required />
            <Input label="Tags (comma separated)" placeholder="React, Design, Agile" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>
          <Input label="Job Description" type="textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />

          <div className="form-actions">
            <Button variant="secondary" type="button" onClick={onCancel}>Cancel</Button>
            <Button type="submit">Post Job</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
