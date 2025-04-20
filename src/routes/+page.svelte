<script>
  let phone = '';
  let password = '';
  let error = '';
  let patientData = null;
  let loading = false;

  async function handleSubmit() {
    error = '';
    loading = true;
    patientData = null;
    try {
      const res = await fetch('http://127.0.0.1:9090/get_patient_result/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      if (!res.ok) {
        error = 'Sai số điện thoại hoặc mật khẩu.';
        return;
      }

      patientData = await res.json();
    } catch (err) {
      error = 'Lỗi kết nối đến máy chủ.';
    } finally {
      loading = false;
    }
  }
</script>

<form on:submit|preventDefault={handleSubmit} class="form">
  <input bind:value={phone} placeholder="Số điện thoại" />
  <input type="password" bind:value={password} placeholder="Mật khẩu" />
  <button type="submit" disabled={loading}>{loading ? 'Đang tải...' : 'Xem kết quả'}</button>
  {#if error}<p class="error">{error}</p>{/if}
</form>


<div class="content">
  {#if patientData?.data?.length > 0}
  <h2>Kết quả xét nghiệm</h2>

  {#each patientData.data as record}
    {#if record.test.length > 0}
      <div class="lab-result">
        <h4>Lần xét nghiệm: {record.test[0].date_ordered}</h4>
        <table class="table">
          <thead>
            <tr>
              <th>Tên Xét Nghiệm</th>
              <th>Kết Quả</th>
            </tr>
          </thead>
          <tbody>
            {#each record.test as test}
              {#if test.parent_test === ""}
                {#if test.result === ""}
                  <!-- Dịch vụ lớn chưa có kết quả -->
                  <tr>
                    <td colspan="2"><strong>{test.name_service}</strong></td>
                  </tr>
                {:else}
                  <!-- Dịch vụ chính có kết quả -->
                  <tr>
                    <td><strong>{test.name_service}</strong></td>
                    <td>{test.result}</td>
                  </tr>
                {/if}
              {:else}
                <!-- Dịch vụ con -->
                <tr>
                  <td>{test.sub}</td>
                  <td>{test.result}</td>
                </tr>
              {/if}
            {/each}
          </tbody>
        </table>
      </div>
    {/if}
  {/each}
{:else}
  <p>Không có kết quả xét nghiệm.</p>
{/if}


</div>




<style>
  .form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: auto;
    padding: 2rem;
  }
  .error {
    color: red;
  }
  .content {
    max-width: 800px;
    margin: auto;
    padding: 2rem;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
    border: 1px solid #ccc;
  }

  .table th, .table td {
    border: 1px solid #ccc;
    padding: 0.5rem;
    text-align: left;
  }
</style>
