const toast = document.querySelector('#toast');
const scanButton = document.querySelector('#scan-button');

scanButton.addEventListener('click', () => {
  scanButton.innerHTML = '<span>✓</span> Scan in progress';
  toast.classList.add('show');
  window.setTimeout(() => {
    scanButton.innerHTML = '<span>✦</span> Run new scan';
    toast.classList.remove('show');
  }, 3200);
});

document.querySelectorAll('.segmented button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelector('.segmented button.selected').classList.remove('selected');
    button.classList.add('selected');
    const projectedTotal = document.querySelector('.chart-legend strong');
    const totals = { '30d': '$29.4k', '90d': '$82.7k', '1y': '$341.2k' };
    projectedTotal.firstChild.textContent = `${totals[button.dataset.range]} `;
  });
});

document.querySelectorAll('.nav-item').forEach((item) => {
  item.addEventListener('click', () => {
    document.querySelector('.nav-item.active').classList.remove('active');
    item.classList.add('active');
  });
});

const serviceFilter = document.querySelector('#service-filter');
serviceFilter.addEventListener('change', () => {
  document.querySelectorAll('tbody tr[data-service]').forEach((row) => {
    row.hidden = serviceFilter.value !== 'all' && row.dataset.service !== serviceFilter.value;
  });
});

const recommendationDetails = {
  ec2: ['Rightsize 8 EC2 instances', 'CPU utilization has stayed below 15% for 14 days. Moving these instances to smaller sizes keeps capacity steady while reducing waste.', '$1,842 estimated monthly savings'],
  ebs: ['Delete unattached EBS volumes', '14 EBS volumes have had no attached instance for more than 30 days. Review snapshots before removing them.', '$612 estimated monthly savings'],
  s3: ['Move S3 data to Intelligent-Tiering', '3.2 TB of infrequently accessed data is eligible for a lower-cost storage class with no application changes.', '$384 estimated monthly savings']
};
const modal = document.querySelector('#recommendation-modal');
document.querySelectorAll('.recommendation').forEach((recommendation) => {
  recommendation.addEventListener('click', () => {
    const [title, copy, saving] = recommendationDetails[recommendation.dataset.recommendation];
    document.querySelector('#modal-title').textContent = title;
    document.querySelector('#modal-copy').textContent = copy;
    document.querySelector('#modal-saving').textContent = saving;
    modal.showModal();
  });
});
document.querySelector('.modal-close').addEventListener('click', () => modal.close());
document.querySelector('#modal-action').addEventListener('click', () => {
  modal.close();
  toast.textContent = 'Recommendation queued for review.';
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 2600);
});
